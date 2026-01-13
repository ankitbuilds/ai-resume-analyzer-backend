import User from '../models/User.js';
import bcrypt from '/bcryptjs';
import jwt from "jsonwebtoken";

//Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check existing user
        const existingUser = await User.FindOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }


        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
        });
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        });


    }
    catch (error) {
        return res.status(500).json({
            message: "Registration failed"
        })
    }

};


//Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.Status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.Status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiredIn: "1d" }
        );
        res.status(200).json({ message: "Login Successfull", token, });



    }
    catch (error) {
        res.status(500).json({ message: "Login failed" })

    }
}