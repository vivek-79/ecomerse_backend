import { Request, Response } from "express";
import { Product } from "../models/Product.model";



export const getProductsByCategory = async (req: Request, res: Response): Promise<Response> => {


    const { categoryId } = req.params;
    const { page = 1 } = req.query;


    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    console.log("Request Came for Product")
    if (!categoryId) {

        return res.status(400)
            .json({ ok: false, message: 'Category is missing' })
    }


    try {
        const [products, total] = await Promise.all([
            Product.find({ category: categoryId })
                .skip(skip)
                .limit(limit),

            Product.countDocuments({ category: categoryId })
        ])

        if (products.length == 0) {
            return res.status(404)
                .json({ ok: false, message: 'No products in this category' })
        }

        const hasMore = skip + products.length < total;

        return res.status(200)
            .json({
                ok: true, message: 'Products fetched successfully', data: products,
                hasMore
            })
    } catch (error) {
        return res.status(500)
            .json({ ok: false, message: 'Error while fetching products' })
    }


}