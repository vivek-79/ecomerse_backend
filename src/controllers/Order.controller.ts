import { Request, Response } from "express";
import Razorpay from "razorpay";
import { ENV } from "../constants/Env";
import crypto from "crypto"
import { Transaction } from "../models/Transaction.model";
import { IItems, Order } from "../models/Order.model";


export const createTransaction = async (req: Request, res: Response): Promise<Response> => {


    const userId = req.user?.userId;
    const { amount } = req.body;

    // Initialize razor pay
    const razorpay = new Razorpay({
        key_id: ENV.razorPayKeyId,
        key_secret: ENV.razorPayKeySecret
    })

    const options = {
        amount,
        currency: "INR",
        receipt: `receipt#${Date.now()}`
    }

    try {


        if (!userId || !amount) {

            return res.status(400)
                .json({ ok: false, message: "No user found" });
        }

        const razorpayOrder = await razorpay.orders.create(options);

        return res.status(201)
            .json({
                ok: true,
                message: "Order created successfully",
                key: ENV.razorPayKeyId,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                orderId: razorpayOrder.id
            })


    } catch (error) {
        return res.status(500)
            .json({
                ok: false,
                message: "Failed to create transaction",
            })
    }
}

export const createOrder = async (req: Request, res: Response): Promise<Response> => {

    const {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        cartItems,
        deliveryDate,
        address
    } = req.body;

    const userId = req.user?.userId;

    const keySecret = ENV.razorPayKeySecret;

    const generatedSignature = crypto.createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex")

    // If fraud payment
    if (generatedSignature != razorpaySignature) {
        return res.status(400)
            .json({
                ok: false,
                message: "Wrong payment signature",
            })
    }

    try {

        const transaction = await Transaction.create({
            userId,
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
            status: "success",
            amount: cartItems.reduce((total: number, current:any) => total + current?.quantity * current.price, 0),
        })

        const order = await Order.create({
            user: userId,
            address,
            deliveryDate,
            items: cartItems?.map((item: IItems) => ({
                product: item?.id,
                quantity: item?.quantity
            })),
            status: "Order Placed"
        });

        transaction.order = order._id;
        await transaction.save();

        return res.status(201)
            .json({
                ok: true,
                message: "Order placed successfully",
                order
            })
    } catch (error) {

        return res.status(500)
            .json({
                ok: false,
                message: "Failed to create order",
            })
    }
}

export const getOrderByUserId = async (req: Request, res: Response) => {

    const userId = req.user?.userId;

    if (!userId) {
        return res.status(400)
            .json({
                ok: false,
                message: "No user found",
            })
    }

    try {
        const orders = await Order.find({ user: userId })
            .populate("user", "name email")
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 });

        return res.status(200)
            .json({
                ok: true,
                message: "Orders fetched successfully",
                orders
            })
    } catch (error) {
        return res.status(400)
            .json({
                ok: false,
                message: "Failed to fetched order",
            })
    }
}