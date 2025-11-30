const {userModel}=require('../models/UserModel');
let jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const getAll=async(req,res)=>{
const allUsers=await userModel.find();
res.status(200).json({
    allUsers
});
}
 
const getSignUp=(req,res)=>{
const {name,gmail,password,address,phone,pincode}=req.body;
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {
        const newUser=await userModel.create({
    name,
    gmail,
    password:hash,
    address,
    phone,
    pincode,
});
let token=jwt.sign({gmail,userId:newUser._id},process.env.JWT_SECRET);
 res.cookie("token", token, {
                httpOnly: true,               
                secure: true,                
                sameSite: "none",            
                maxAge: 24 * 60 * 60 * 1000  
            });
res.status(200).json({
    message:"User created Successfully",
    data:newUser
});
});
});
}


const getSignIn=async(req,res)=>{
const {gmail,password}=req.body;
const checkUser=await userModel.findOne({gmail});
if(!checkUser){
    return res.status(401).json({
        message:"Something went wrong"
    });
}
bcrypt.compare(password, checkUser.password, function(err, result) {
    console.log(result);
    if(!result){
        return res.status(401).json({
            message:"user not found",
        });
    }
    let token=jwt.sign({gmail,userId:checkUser._id}, process.env.JWT_SECRET);
     res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
    res.status(200).json({
        message:"login successfull",
        data:checkUser
    });
});
}


const getParticularUser=async(req,res)=>{
const currentUser=await userModel.findById(req.user.userId);
res.status(200).json({
    message:"User data is here",
    data:currentUser,
});
}


const getProfilePic=async(req,res)=>{
const userId=req.user.userId;
const filePath=req.file.filename;
const profilePic=await userModel.findByIdAndUpdate(userId,{profilePic:filePath},{new:true});
res.status(200).json({
    message:"User Profile pic shared successfully",
    data:profilePic,
});
}

exports.getSignUp=getSignUp;
exports.getAll=getAll;
exports.getSignIn=getSignIn;
exports.getParticularUser=getParticularUser
exports.getProfilePic=getProfilePic;