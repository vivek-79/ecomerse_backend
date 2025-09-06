import mongoose, { Document, Schema } from "mongoose";



// Interface
interface ICategory extends Document{
    _id: mongoose.Types.ObjectId
    name:string
    image:string,
    products:[{
        type:mongoose.Types.ObjectId,
        ref:String
    }]
    createdAt:Date
    updatedAt:Date
}


// Schema
const categorySchema: Schema = new Schema<ICategory>({
    
    name:{
        type:String,
        default:'New category'
    },
    image:{
        type:String,
        required:true
    },
    products:[
        {type:mongoose.Schema.Types.ObjectId,ref:"Product"}
    ]
},{ timestamps:true })


// Model
export const Category = mongoose.model<ICategory>('Category', categorySchema);