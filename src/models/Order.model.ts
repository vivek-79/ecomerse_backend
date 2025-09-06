import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User.Model";


export enum OrderStatus{ 
    Order_Placed="Order_Placed",
    Shipping="Shipping",
    Out_for_Delivery="Out_for_Delivery",
    Delivered="Delivered",
    Cancelled="Cancelled" 
}


export interface IItems extends Document{
    product: mongoose.Types.ObjectId,
    quantity:number
}
export interface IOrder extends Document{
    _id:mongoose.Types.ObjectId,
    user:IUser,
    deliveryDate:Date,
    address?: {
        street: string
        city: string
        state: string
    }
    items:IItems[],
    status: OrderStatus,
    createdAt:Date,
    updatedAt:Date
}


const itemSchema = new Schema<IItems>({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{type:Number,required:true},
})

const orderSchema = new Schema<IOrder>({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    },
    address: {
        street: { type: String,required:true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    items:{
        type:[itemSchema],
        required:true
    },
    status:{
        type: String,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Order_Placed,
        required:true
    }
},{timestamps:true})


export const Order = mongoose.model<IOrder>("Order",orderSchema)