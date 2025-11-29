let jwt=require('jsonwebtoken');
const verifyToken=async(req,res,next)=>{
    let token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please do a sign in first"
        });
    }
    let data=jwt.verify(token,process.env.JWT_SECRET);
    req.user=data;
    next();
}

exports.verifyToken=verifyToken;