import { Request, Response } from "express";
import { loginSchema } from "../lib/ZodVerification";
import { User } from "../models/User.Model";
import { generateAccessToken, generateRefreshToken } from "../lib/GenerateTokens";
import { cookieOptions } from "../lib/CookieOptions";






export const register = async (req: Request, res: Response): Promise<Response> => {

    try {

        const result = loginSchema.safeParse(req.body)

        // zod validation failed
        if (!result.success) {
            return res.status(400).json({
                ok: false,
                message: "All fields are required",
            });
        }

        // Data from body
        const { phone, password } = req.body


        // Checking if user exist
        const user = await User.findOne({ phone })

        if (user) {

            return res.status(409)
                .json({ ok: false, message: "User already exist with this email" })

        }

        // Create new user
        const newUser = await User.create({
            phone,
            password,
        })

        if (!newUser) {
            return res.status(500)
                .json({ ok: false, message: "Error while creating user" });
        }

        // Generating Tokens
        const accessToken = generateAccessToken({ phone, userId: newUser._id.toString() })

        const refreshToken = generateRefreshToken({ phone, userId: newUser._id.toString() })


        return res.status(201)
            .cookie('accessToken', accessToken, cookieOptions({ type: "accessToken" }))
            .cookie('refreshToken', refreshToken, cookieOptions({ type: "refreshToken" }))
            .json({ ok: true, message: "User created successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({ ok: false, message: "Something went wrong" })
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {

    try {

        const result = loginSchema.safeParse(req.body)

        // zod validation failed
        if (!result.success) {
            return res.status(400).json({
                ok: false,
                message: "All fields are required",
            });
        }

        // Data from body
        const { phone, password } = req.body


        // Checking if user exist
        const user = await User.findOne({ phone })

        if (!user) {

            return res.status(400)
                .json({ ok: false, message: "User not exist with this email" })

        }

        // Generating Tokens
        const accessToken = generateAccessToken({ phone, userId: user._id.toString() })

        const refreshToken = generateRefreshToken({ phone, userId: user._id.toString() })


        return res.status(200)
            .cookie('accessToken', accessToken, cookieOptions({ type: "accessToken" }))
            .cookie('refreshToken', refreshToken, cookieOptions({ type: "refreshToken" }))
            .json({ ok: true, message: "User logged in successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500)
            .json({ ok: false, message: "Something went wrong" })
    }
}