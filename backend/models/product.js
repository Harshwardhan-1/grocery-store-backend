const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    name:String,
    price:Number,
    image:String,
    quantity:Number,
})

const productModel=mongoose.model("product",productSchema);
exports.productModel=productModel;