router.post("/addToCart", auth, (req, res) => {

    //먼저 User Collection에 해당 유저의 정보를 가져오기
    User.findOne({_id: req.user._id},
        (err, userInfo) => {

            // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인

            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            //상품이 이미 있을때
            if (duplicate) {
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id": req.body.productId},
                    {$inc: {"cart.$.quantity": 1}},
                    {new: true},
                    (err, userInfo) => {
                        if (err) return res.status(200).json({success: false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
            //상품이 이미 있지 않을때
            else {
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    {new: true},
                    (err, userInfo) => {
                        if (err) return res.status(400).json({success: false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
        })
});