const express = require('express');
const router = express.Router();
const {User} = require("../models/User");
const {Product} = require('../models/Product')
const {Payment} = require('../models/Payment')
const {auth} = require("../middleware/auth");
const async = require('async');
const multer = require('multer');
//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        profileImage: req.user.profileImage,
        nickName: req.user.nickName,
        phone: req.user.phone,
        cart: req.user.cart,
        history: req.user.history,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    console.log("router /login");
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({loginSuccess: false, message: "Wrong password"});

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: ""}, (err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    // auth middleware 통과하여 req에 데이터가 담겨온다
    User.findOne({_id: req.user._id},
        (err, userInfo) => {  //db정보가 user에 담김
            // 상품 담겨있는지 확인
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            // 담겨있으면 개수만 + 1
            if (duplicate) {
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id": req.body.productId}, //id로 찾고 그 다음 cart.id로 찾는다
                    {$inc: {"cart.$.quantity": 1}},   //increment 약자로 위에 찾은내역 1개 증가시킴
                    {new: true}, //업데이트된 유저정보를 받기 위해
                    (err, userInfo) => {
                        if (err) {
                            return res.status(400).json({success: false, err})
                        } else {
                            console.log("11: %o", userInfo.cart);
                            res.status(200).send(userInfo.cart)
                        }

                    }
                )
                // 안담겨있으면 새로 추가
            } else {
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                data: Date.now()
                            }
                        }
                    },
                    {new: true}, //업데이트된 유저정보를 받기 위해
                    (err, userInfo) => {
                        if (err) {
                            return res.status(400).json({success: false, err})
                        } else {
                            res.status(200).send(userInfo.cart)
                        }
                    }
                )
            }
        })
});

router.get('/removeFromCart', auth, (req, res) => {
    //auth에서 user 정보를 활용
    //userData cart 삭제
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$pull":
                {"cart": {"id": req.query.id}}
        },
        {new: true},
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id;
            })
            //카트에 있는 상품정보를 가지고 와서 카트에 담긴 개수를 상품정보에 추가할 예정
            Product.find({_id: {$in: array}})
                .populate('writer')
                .exec((err, productInfo) => {
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        })
    //cartDetail 다시 불러오기
})

router.post('/successBuy', auth, (req, res) => {

    //1. User Collection 안에 History 필드 안에 간단한 결제 정보 넣기
    let history = [];
    let transactionData = {};
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentId
        })
    })
    //2. Payment Collection 안에 자세한 결제 정보 넣어주기
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    //history 정보 저장
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $push: {history: history},
            $set: {  //데이터 변경
                cart: []
            }
        },
        {new: true},
        (err, user) => {
            if (err) return res.json({success: false, err});
            //payment에 transactionData 정보 저장
            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                console.log("doc:", doc);
                if (err) return res.json({success: false, err})

                //상품 당 몇개의 quantity를 샀는지
                let products = [];
                doc.product.forEach(item => {
                    products.push({id: item.id, quantity: item.quantity})
                })
                //3. Product Collection 안에 Sold 정보 업데이트
                async.eachSeries(products, (item, callback) => {

                    Product.update(
                        {_id: item.id},
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        {new: false},
                        callback
                    )
                }, (err) => {
                    if (err) return res.status(400).json({success: false, err})
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: [] //결제 성공 후
                    })
                })
            });
        })
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profile/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({storage: storage}).single("file")

//이미지 파일만 물리 경로에 업로드 후 파일 경로 리턴
router.post('/profileImage', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return req.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.filename})
    })
})

router.post('/updateProfile', (req, res) => {
    User.findOneAndUpdate({_id: req.body.id},
        {$set: {
           profileImage: req.body.profileImage,
           nickName: req.body.nickName,
            }
        },
        {new: true},
        (err, userInfo) => {
            if (err) {
                return res.status(400).json({success: false, err})
            }else{
                return res.json({success: true})
                // console.log('업데이트 성공 userInfo:', userInfo);
            }
        }
    );
})

router.post('/changeUserInfo', (req, res) => {
    User.findOneAndUpdate({_id: req.body.id},
        {$set: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            }
        },
        {new: true},
        (err, userInfo) => {
            if (err) {
                return res.status(400).json({success: false, err})
            }else{
                // return res.json({success: true})
                return res.status(200).send(userInfo); //payload로 action으로 return 함
                // console.log('업데이트 성공 userInfo:', userInfo);
            }
        }
    );
})

module.exports = router;
