const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    name:String,
    gmail:String,
    password:String,
    address:String,
    phoneNo:Number,
    pincode:String,
    profilePic:String
});

const userModel=mongoose.model("user",UserSchema);
exports.userModel=userModel;