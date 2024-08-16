const express=require("express");
const { signup, signin,google } = require("../controllers/authController");
const route=express.Router();

route.post("/signup",signup);
route.post("/signin", signin);
route.post("/google", google);


module.exports=route;