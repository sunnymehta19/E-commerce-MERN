const bcrypt = require("bcrypt");
const userModel = require('../../models/user');


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


//Logout



module.exports = { registerUser }
