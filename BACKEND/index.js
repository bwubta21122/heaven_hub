const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRouter=require("./routes/userRouter");
const authRouter=require("./routes/authRouter");
dotenv.config();
mongoose.connect(`${process.env.MONGO}/heaven_hub`).then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
const app=express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("server is runnning in 3000");
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
});
