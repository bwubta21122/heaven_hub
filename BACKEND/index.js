const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRouter=require("./routes/userRouter");
const authRouter=require("./routes/authRouter");
const listingRouter=require("./routes/listingRouter");

const cookieParser=require("cookie-parser");
const path=require("path");

dotenv.config();
mongoose.connect(`${process.env.MONGO}/heaven_hub`).then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
const __dirName=path.resolve();


const app=express();
const cors = require('cors');
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use((req, res, next) => {
//     console.log(`Request received: ${req.method} ${req.url}`);
//     next();
//   });
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("server is runnning in 3000");
});

app.use("/user",userRouter);
app.use("/auth",authRouter);
app.use("/listing",listingRouter);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
});
