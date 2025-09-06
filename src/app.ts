import express, { Application } from "express"
import cors from "cors"

const app:Application = express()

// Cors
app.use(cors(
    {
        origin: "*",
        credentials: true, 
    }
))

// Body
app.use(express.json())


// Importing Routes
import { authRouter } from "./routes/Auth.routes"
import { orderRouter } from "./routes/Order.routes"
import { userRouter } from "./routes/User.routes"
import { categoryRouter } from "./routes/Category.routes"
import { productRouter } from "./routes/Product.routes"


// Assigning Routes
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)


export { app }