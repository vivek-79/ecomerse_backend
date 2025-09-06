



import { Router } from "express";
import { createOrder, createTransaction, getOrderByUserId } from "../controllers/Order.controller";



export const orderRouter = Router();

orderRouter.route('/').post(getOrderByUserId)
orderRouter.route('/transaction').post(createTransaction)
orderRouter.route('/create').post(createOrder)