        const cartRouter=require('express').Router();

        const {verifyToken}=require("../middleware/verifyToken");
        const {getAllCart,SeeCartItems,getDelete,getAddPayment}=require("../Controllers/Cartcontroller");

        cartRouter.get("/cartItems",verifyToken,SeeCartItems);
        cartRouter.post("/cartItems",verifyToken,getAllCart);
        cartRouter.post("/cartDelete",verifyToken,getDelete);



        cartRouter.post("/AddPayment",verifyToken,getAddPayment);


        
        exports.cartRouter=cartRouter;
