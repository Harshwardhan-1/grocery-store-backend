const userRoutes=require('express').Router();

const {getSignUp,getAll,getSignIn,getParticularUser,getProfilePic}=require('../Controllers/UserController');

const {verifyToken}=require("../middleware/verifyToken");
const upload=require('../middleware/imagesMiddleware');
userRoutes.get("/getAll",getAll);
userRoutes.post("/signup",getSignUp);
userRoutes.post("/signin",getSignIn);
userRoutes.get("/particularUser",verifyToken,getParticularUser);

userRoutes.post("/profilePic",verifyToken,upload.single("images"),getProfilePic);

exports.userRoutes=userRoutes;