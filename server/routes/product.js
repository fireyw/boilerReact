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

    //product collection에 들어있는 모든 상품정보 가져오기
    Product.find()  //조건 없으면 모든 데이터가져옴
        .populate('writer')  //writer에 해당되는 유저 정보를 가져올수있다 이메일 등등
        .exec((err, productInfo)=>{
            if(err){
                return res.status(400).json({success:false, err})
            } else{
                return res.status(200).json({success:true, productInfo})
            }

        })
})

module.exports = router;
