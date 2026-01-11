const bcrypt = require("bcrypt");
const userModel = require('../../models/user');
const jwt = require("jsonwebtoken");

//Register
const registerUser = async (req, res) => {
    let { username, mobilenumber, email, password } = req.body;

    try {
        let checkUser = await userModel.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json({ message: "User already exists! Try Login" });
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // console.log(hashedPassword);
        let newUser = await userModel.create({
            username,
            mobilenumber,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "Account created successfully! Please Login.",
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error Occured",
        });
    }
};


//Login
const loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let checkUser = await userModel.findOne({ email: email });
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist! Please register first."
            })
        }

        let checkPassworkMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPassworkMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password! Try again."
            })
        }

        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            role: checkUser.role
        },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60m" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                role: checkUser.role
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error Occured",
        });
    }

}


//Logout
const logOutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged Out successfully!"

    })

}


//Authentication Middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        });      
    }

    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        req.status(401).json({
            success: false,
            message: "Unauthorised user!"
        });      
    }  
}




module.exports = { registerUser, loginUser, logOutUser, authMiddleware };
