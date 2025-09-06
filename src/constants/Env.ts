import dotenv from "dotenv"
dotenv.config()


export const ENV ={

    mongoDbUri: process.env.MONGO_URI!,
    port:Number(process.env.PORT!),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
    razorPayKeyId: process.env.RAZOR_PAY_KEY_ID!,
    razorPayKeySecret: process.env.RAZOR_PAY_SECRET!
}