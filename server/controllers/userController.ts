// controllers/userController.ts
import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/User"
import jwt from "jsonwebtoken"

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" })
}

// Register User
export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists", code: "USER_EXISTS" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering new user" })
    }
}

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json({ message: "Invalid email or password" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in" })
    }
}
