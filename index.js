import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js'; 
import jwt from "jsonwebtoken";
const app=express();
const mongoUrl = "mongodb+srv://admin:1234@cluster0.8rwyzfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(mongoUrl,{})
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("database connected");
    
})


app.use(bodyParser.json())
app.use((req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer","")
    console.log(token);
    
    if(token!=null){
        jwt.verify(token,"V2I3D4U5t@",(error,decoded)=>{
            if(!error){

                req.user=decoded
            }
        })
    }
    next()
})
app.use("/students",studentRouter)
app.use("/products",productRouter)
app.use("/users",userRouter)

app.listen(
    3000,()=>{
        console.log('server running on port 3000');
        
    }
)
