//-누가 어떤상품에 결제 했는지
//-paypal에서 결제 후 제공되는 정보 저장

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
    user:{
        type:Array,
        default:[]
    },
    data:{
        type:Array,
        default: []
    },
    product:{
        type:Array,
        default:[]
    }
}, {timestamps:true})


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }