const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product')
//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res)=>{
    upload(req, res, err=>{
        if(err){
            return req.json({success:false, err})
        }
        return res.json({success:true, filePath: res.req.file.path, fileName: res.req.filename })
    })
})

//요청 url과 현재페이지가 같으면 '/'만 하면 된다 /api/product
router.post('/', (req, res)=>{
    const product = new Product(req.body);
    product.save((err)=>{
        if(err){
            return res.status(400).json({success:false, err})
        }else{
            return res.status(200).json({success:true})
        }
    }); //넣어둔 정보들이 product에 저장됨
})

router.post('/products', (req, res)=>{
    let skip = req.body.skip ? parseInt(req.body.skip): 0;
    let limit = req.body.limit ? parseInt(req.body.limit): 20;
    let term = req.body.searchTerm;
    let findArgs={};
    for(let key in req.body.filters){
        if(req.body.filters[key].length>0){

            //console.log("key : ", key);
            if(key==="price"){
                findArgs[key]={
                    $gte: req.body.filters[key][0], //greater than equal
                    $lte: req.body.filters[key][1]  //less then equal
                }
            }else{
                findArgs[key]=req.body.filters[key];
            }
       }
    }
    // console.log("find: ", findArgs);

    if(term){
        Product.find(findArgs)  //조건 없으면 모든 데이터가져옴
            .find({$text: {$search: term}}) //Product.js에서 검색 필드설정
            .populate('writer')  //writer에 해당되는 유저 정보를 가져올수있다 이메일 등등
            .skip(skip)   //mongodb에 해당 내용 전달
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) {
                    return res.status(400).json({success: false, err})
                } else {
                    return res.status(200).json({success: true, productInfo, postSize: productInfo.length})
                }
            })
    }else {
        //product collection에 들어있는 모든 상품정보 가져오기
        Product.find(findArgs)  //조건 없으면 모든 데이터가져옴
            .populate('writer')  //writer에 해당되는 유저 정보를 가져올수있다 이메일 등등
            .skip(skip)   //mongodb에 해당 내용 전달
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) {
                    return res.status(400).json({success: false, err})
                } else {
                    return res.status(200).json({success: true, productInfo, postSize: productInfo.length})
                }
            })
    }
})

router.get('/products_by_id', (req, res)=>{
    let type= req.query.type; //get 방식 jquery 사용
    let productIds= req.query.id;
    if(type==="array"){
        //문자열을 productIds를 배열을 변경
        productIds = req.query.id.split(',');
        // ids = req.query.id.split(',');
        // productIds = ids.map(item=>{
        //     return item
        // })
        // console.log('ids:', ids);
        // console.log('productIds:', productIds);
        Product.find({_id: {$in: productIds}})
            .populate('writer')
            .exec((err, product)=>{
                if(err) return res.status(400).send(err)
                return res.status(200).json({success:true, product})
            })
    }else{
        Product.find({_id: productIds})
            .populate('writer')
            .exec((err, product)=>{
                if(err) return res.status(400).send(err)
                return res.status(200).send({success:true, product})
            })
    }
})


module.exports = router;
