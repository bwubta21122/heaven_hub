const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error");
const jwt = require('jsonwebtoken');
module.exports.signup = async (req, res, next) => {
    console.log(req.body);
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });
    try {
        await newUser.save();
        res.status(200)
            .json("User created sucessfully!");
    }
    catch (error) {
        next(error);
    }
};
module.exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validate = await User.findOne({ email });
        if (!validate) {
            return next(errorHandler(404, "User not found!"))
        }
        const comparePass = await bcrypt.compareSync(password, validate.password);
            if(!comparePass){
            return next(errorHandler(401, "Incorrect email or passwoed!"));
        }

        const token = jwt.sign({ id: validate._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validate._doc;
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(rest);
    }
    catch (error) {
        next(error);
    }
};
