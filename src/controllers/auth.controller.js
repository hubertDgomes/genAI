import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import 'dotenv/config'
import tokenBlacklist from "../models/blacklist.model.js"

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
};

const registerUserController = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required!"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "The account already exists!"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const newUser = await userModel({
        username,
        email,
        password: hash
    })
    await newUser.save()
    const token = jwt.sign({
        id: newUser._id,
        username: newUser.username
    },
        process.env.JWT_TOKEN,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, COOKIE_OPTIONS)
    res.status(201).json({
        message: "User registered successfully!",
        token,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    })
}

const loginUserController = async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials!"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials!"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        process.env.JWT_TOKEN,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, COOKIE_OPTIONS)
    res.status(200).json({
        message: "User logged in successfully!",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const logoutUserController = async (req, res) => {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null)
    if (token) {
        try {
            const newToken = await new tokenBlacklist({
                token
            })
            await newToken.save()
        } catch (e) {
            console.error("Token blacklist save error:", e.message)
        }
    }

    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" })
    res.status(200).json({
        message: "User logged out successfully!"
    })
}

const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
export default { registerUserController, loginUserController, logoutUserController, getMeController }