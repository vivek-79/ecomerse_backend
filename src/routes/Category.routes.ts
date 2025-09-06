



import { Router } from "express";
import { getCategories } from "../controllers/Category.controller";




export const categoryRouter = Router();

categoryRouter.route('/').get(getCategories)