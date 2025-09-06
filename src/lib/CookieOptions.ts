import { CookieOptions } from "express";



export const cookieOptions=({ type }: { type:"accessToken"|"refreshToken"})=>{

    const baseOptions: CookieOptions = {
        httpOnly: true,
        sameSite: "strict",  
        secure: process.env.NODE_ENV === "production",
    };

    if (type === "accessToken") {
        return { ...baseOptions, maxAge: 1 * 24 * 60 * 60 * 1000 }; // 1 day
    } else {
        return { ...baseOptions, maxAge: 7 * 24 * 60 * 60 * 1000 }; // 7 days
    }
}
