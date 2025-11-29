const {productModel}=require('../models/product');
const getAllProduct=async(req,res)=>{
const showProduct=await productModel.insertMany([{
    userId:req.user.userId,
    name:"aata",
    price:50,
    image:"aata.jpg",
    quantity:1
},

{
   userId:req.user.userId,
    name:"ghee",
    price:70,
    image:"ghee.webp",
    quantity:1
},

{
   userId:req.user.userId,
    name:"harpic",
    price:50,
    image:"harpic.webp",
    quantity:1
},

{
    userId:req.user.userId,
    name:"maggie",
    price:20,
    image:"maggi.jpg",
    quantity:1
},

{
    userId:req.user.userId,
    name:"marie",
    price:10,
    image:"marie.jpg",
    quantity:1,
},

{
   userId:req.user.userId,
    name:"milk",
    price:40,
    image:"milk.jpg",
    quantity:1
},

{
   userId:req.user.userId,
    name:"moong",
    price:70,
    image:"moong.jpg",
    quantity:1
},

{
    userId:req.user.userId,
    name:"masoor",
    price:80,
    image:"mosoor.jpg",
    quantity:1
},

{
    userId:req.user.userId,
    name:"safola",
    price:80,
    image:"safola.webp",
    quantity:1
},

{
    userId:req.user.userId,
    name:"surf",
    price:90,
    image:"surf.jpg",
    quantity:1
},
]);
res.status(200).json({
    message:"Image added Successfully",
    data:showProduct
});
}


const getParticular=async(req,res)=>{
const {id}=req.body;
const check=await productModel.findById(id);
if(!check){
    return  res.status(401).json({
        message:"No product in the list"
    });
}
res.status(200).json({
    message:"User id find",
    data:check
});
}



const getQuantity=async(req,res)=>{
const {id,quantity}=req.body;
const product= await productModel.findById(id);
if(!product){
    return res.status(401).json({
        message:"First go and do sign up"
    });
}
const give=product.price*quantity;
return res.status(200).json({
    message:"quantity updated",
    data:give,
});
}

exports.getAllProduct=getAllProduct;
exports.getParticular=getParticular;
exports.getQuantity=getQuantity;