const express=require("express");
const { updateUserInfo,deleteUser} = require("../controllers/userController");
const route=express.Router();
const {veifyToken} =require("../utils/verifyUser")
route.get("/test",(erq,res)=>{
    res.send("hello world");
});
route.post("/update/:id",veifyToken, updateUserInfo);
route.delete("/delete/:id",veifyToken, deleteUser);
module.exports=route;