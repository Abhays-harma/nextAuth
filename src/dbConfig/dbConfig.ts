import mongoose from "mongoose";


export async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("db connected")
        })
        connection.on('error',(error)=>{
            console.log("db connection error",error)
            process.exit(1)
        })
    } catch (error) {
        console.log("db connection error",error)
    }
}