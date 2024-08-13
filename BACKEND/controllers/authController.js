const User=require("../models/userModels");
const bcrypt=require("bcrypt");
module.exports.signup=async (req,res,next)=>{
    console.log(req.body);
    const{userName,email,password}=req.body;
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword=bcrypt.hashSync(password,10);
    const newUser=new User({userName,email,password:hashPassword});
    try{
        await newUser.save();
        res.status(200)
        .json("User created sucessfully!");
    }
    catch(error){
        next(error);
    }
};