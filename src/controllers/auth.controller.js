import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import 'dotenv/config'
import tokenBlacklist from "../models/blacklist.model.js"

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

    res.cookie("token", token)
    res.status(201).json({
        message: "User registered successfully!",
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

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully!",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }

    })
}

const logoutUserController = async (req, res) => {
    const token = req.cookies.token
    if (token) {
        const newToken = await new tokenBlacklist({
            token
        })
        await newToken.save()
    }

    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully!"
    })
}

const getMeController = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
export default { registerUserController, loginUserController, logoutUserController, getMeController }