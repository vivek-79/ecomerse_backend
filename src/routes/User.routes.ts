import { login } from "../controllers/Auth.controller";

const { Router } = require("express");





export const userRouter = Router()

userRouter.route('/').post(login)