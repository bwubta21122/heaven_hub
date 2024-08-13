const express=require("express");
const route=express.Router();

route.get("/test",(erq,res)=>{
    res.send("hello world");
});
module.exports=route;