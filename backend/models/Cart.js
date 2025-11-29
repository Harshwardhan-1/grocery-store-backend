const mongoose=require('mongoose');

const CartSchema=mongoose.Schema({
     userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
    quantity:Number, 
    price:Number,
    image:String,
});

const cartModel=mongoose.model("cart",CartSchema);
exports.cartModel=cartModel;
