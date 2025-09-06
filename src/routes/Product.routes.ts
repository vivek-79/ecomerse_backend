import { Router } from "express";
import { getProductsByCategory } from "../controllers/Product.controller";




export const productRouter = Router();

productRouter.route('/category/:categoryId').get(getProductsByCategory)