import mongoose from "mongoose";
import { ENV } from "../constants/Env";



const MONGO_URI = ENV.mongoDbUri || "your_mongodb_connection_string";
export async function connectDb() {
    
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}