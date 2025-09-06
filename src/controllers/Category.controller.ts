import { Request, Response } from "express"
import { Category } from "../models/Category.model"




export const getCategories = async (req: Request, res: Response): Promise<Response> => {

    try {

        const data = await Category.find({})
        console.log("Request Came for category")
        return res.status(200)
            .json({ message: 'Category fetched successfully', data })
    } catch (error: any) {
        return res.status(200)
            .json({ message: 'Category fetched successfully', error: error.message })
    }
}