const productRouter=require('express').Router();

const {verifyToken}=require('../middleware/verifyToken');
const {getAllProduct,getParticular,getQuantity}=require('../Controllers/productcontroller');

productRouter.get("/allimages",verifyToken,getAllProduct);
productRouter.post("/particular",verifyToken,getParticular);
productRouter.post("/getquantity",verifyToken,getQuantity)

exports.productRouter=productRouter;