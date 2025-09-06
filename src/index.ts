import { app } from "./app";
import { ENV } from "./constants/Env";
import { connectDb } from "./lib/ConnectDb";



const port = ENV.port || 8000

connectDb()
.then(()=>{

    app.listen({port,host:"0.0.0.0"},()=>{
        console.log(`App is listening on PORT: ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
})