const {cartModel}=require('../models/Cart');

const Razorpay = require('razorpay');
const crypto = require('crypto');


const razorpay = new Razorpay({
  key_id:"rzp_test_RlXg2HpJH77h64",       // nayi Key ID
  key_secret:"QjBcasEqfh95LOJjVqOBfg0N"   // nayi Secret
});

const SeeCartItems=async(req,res)=>{
    const userId=req.user.userId;
const allCart=await cartModel.find({userId:userId});
res.status(200).json({
    allCart
});
};


const getAllCart=async(req,res)=>{
    const {userId,quantity,price,image}=req.body;
    const AddCart=await cartModel.create({
        userId,
        quantity,
        price,
        image,        
    });
    res.status(200).json({
        message:"Data Added Successfully",
        data:AddCart
    });
}


const getDelete=async(req,res)=>{
    const {id}=req.body;
    const data=await cartModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"Deleted Succssfully",
        data:data
    });
}



const getAddPayment = async (req, res) => {
  try {
    const { amount, productName } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount invalid" });
    }

    const options = {
      amount: Number(amount) * 100,  // paise me
      currency: "INR",
      receipt: "receipt_" + productName + "_" + Date.now(),
      notes: { product: productName },
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created:", order);

    res.status(200).json(order);

  } catch (error) {
    console.log("Razorpay create order error:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllCart=getAllCart;
exports.SeeCartItems=SeeCartItems;
exports.getDelete=getDelete;
exports.getAddPayment=getAddPayment;