import mongoose, { Document, Schema } from "mongoose";



// Interface
export interface IUser extends Document{
    _id: mongoose.Types.ObjectId
    name:string
    email?:string
    avatar?:string
    phone:string
    password:string,
    address?:{
        street:string
        city:string
        state:string
    }
    createdAt:Date
    updatedAt:Date
}


// Schema
const userSchema:Schema = new Schema<IUser>({
    
    name:{
        type:String,
        default:'New user'
    },
    email:{
        type:String,
        unique:true
    },
    password:{ 
        type: String, 
        required: true 
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String
    },
    address:{
        street:{ type:String },
        city:{ type:String },
        state:{ type:String },
    }
},{ timestamps:true })


// Model
export const User = mongoose.model<IUser>('User', userSchema);