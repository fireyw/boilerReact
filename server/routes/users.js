const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

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
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    console.log("router /login");
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

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
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    // auth middleware 통과하여 req에 데이터가 담겨온다

    console.log("router: addTocart");
    let duplicate = false;
    User.findOne({_id: req.user._id},
        (err, userInfo) => {  //db정보가 user에 담김
            // 상품 담겨있는지 확인

            if (userInfo.cart.length > 0) {
                userInfo.cart.forEach((item) => {
                    if (item.id === req.body.productId) {
                        duplicate = true;
                    }
                })
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
                    res.status(200).send(userInfo.cart)
                }

            }
        )
        // 안담겨있으면 새로 추가
    }else{
        User.findOneAndUpdate(
            {_id:req.user._id},
            {
                $push: {
                    cart:{
                        id: req.body.productId,
                        quantity: 1,
                        data:Date.now()
                    }
                }
            },
            {new:true},
            (err, userInfo)=>{
                if(err){
                    return res.status(400).json({success:false, err})
                }else{
                    res.status(200).send(userInfo.cart)
                }
            }
        )
    }
});

module.exports = router;
