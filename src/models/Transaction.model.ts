import mongoose, { Schema } from "mongoose";


export enum TransactionStatus{
    Success="Success", 
    Failed="Failed", 
    Pending="Pending"
}
export interface ITransaction{
    user:mongoose.Types.ObjectId,
    order:mongoose.Types.ObjectId,
    paymentId:string,
    status: TransactionStatus,
    amount:number,
    createdAt: Date,
    updatedAt: Date
}


const transactionSchema = new Schema<ITransaction> ({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    paymentId:{type:String,required:true},
    status:{
        type:String,
        enum:["Success","Failed","Pending"],
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
},{timestamps:true})


export const Transaction = mongoose.model<ITransaction>("Transaction",transactionSchema);