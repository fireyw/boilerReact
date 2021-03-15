const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectID,
        ref:'User'  //이부분이 있어서 populate함수 사용 가능
    },
    title:{
        type:String,
        maxLength:50
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    image:{
        type:Array,
        default: []
    },
    sold:{
        type:Number,
        maxLength: 100,
        default:0
    },
    continents: {
        type:Number,
        default:1
    },
    views:{
        type:Number,
        default:0
    },
}, {timestamps:true})

//find({$text: {$search: term}}) 필드 설정
productSchema.index({
    title:'text',
    description: 'text'
}, {
    weights:{
        title:5,
        description:1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }