const express=require("express");
const { updateUserInfo,deleteUser,getUserListing} = require("../controllers/userController");
const route=express.Router();
const {veifyToken} =require("../utils/verifyUser")
route.get("/test",(erq,res)=>{
    res.send("hello world");
});
route.post("/update/:id",veifyToken, updateUserInfo);
route.delete("/delete/:id",veifyToken, deleteUser);
route.get('/listings/:id',veifyToken,getUserListing);
module.exports=route;