const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const User = require("../models/User");

const saltRounds = 10;

// sinup route handler
exports.singup = async (req, res) => {

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: "Provide the information in input fields!" })
        }

        // check the validation of email or passwror --> validation

        // check whether user is exits or not
        const isUserExits = await User.findOne({ email });

        if (isUserExits) {
            return res.status(400).json({ success: false, message: "User is already taken!" });
        }

        // hash the password  --> secure password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, saltRounds)
        } catch (err) {
            console.log(err, 'hash the password in singup endpoint')
            return res.status(500).json({ success: false, message: "Error in hash Password!" })
        }

        const userDoc = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        return res.status(200).json({ success: true, message: "User created successfully.", userDoc });

    } catch (error) {
        console.log(error, 'singup endpoint')
        res.status(400).json({ success: false, message: "User con't be registerd , please try later!" })
    }
};


exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please, fill all the detail carefully!" })
        }

        // find out the user
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(401).json({ success: false, message: "Invalid credentilas!" })
        }

        // is password match
        const isAuthenticate = await bcrypt.compare(password, userDoc.password);

        if (!isAuthenticate) {
            return res.status(401).json({ success: false, message: "Invalid credentials!" })
        }

        // user is authenticate --> provide the jwt token

        const token = jwt.sign({ email: userDoc.email, id: userDoc._id, role: userDoc.role, },
            process.env.JWT_SECRECT_KEY,
            { expiresIn: '24h' }
        );

        // know --> user.password = undefined -> use if you want to send userDoc as response [ warning! but convert document user into object ]
        res.status(200)
            .cookie('token', token, { expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) })
            .json({ success: true, message: "Succesfully Login!", token })

    } catch (error) {
        console.log(error, 'error in login endpoint')
        return res.status(400).json({ success: false, message: "Error! try later." })
    }
}