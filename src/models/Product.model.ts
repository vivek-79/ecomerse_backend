import mongoose, { Document, Schema } from "mongoose";



// Interface
export interface IProduct extends Document{
    _id: mongoose.Types.ObjectId
    name:string
    image:string,
    price:Number,
    description?:string,
    category:[{
        type:mongoose.Types.ObjectId,
        ref:String
    }]
    createdAt:Date
    updatedAt:Date
}


// Schema
const productSchema: Schema = new Schema<IProduct>({
    
    name:{
        type:String,
        default:'New product'
    },
    image:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type:String,
    },
    category:[
        {type:mongoose.Schema.Types.ObjectId,ref:"Category"}
    ]
},{ timestamps:true })


// Model
export const Product = mongoose.model<IProduct>('Product', productSchema);