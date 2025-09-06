

import jwt, { SignOptions } from 'jsonwebtoken'
import { UserLoginDto } from '../types/User.types'
import { ENV } from '../constants/Env'


export const generateAccessToken = ({ phone, userId }: UserLoginDto):string=>{

    const secret = ENV.accessTokenSecret

    const token = jwt.sign({ phone, userId }, secret, { expiresIn: "1d" }) 

    return token;
}
export const generateRefreshToken = ({ phone, userId }: UserLoginDto):string=>{

    const secret = ENV.accessTokenSecret

    const token = jwt.sign({ phone, userId }, secret, { expiresIn: "7d" }) 

    return token;
}