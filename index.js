import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js'; 
import jwt from "jsonwebtoken";
//import { configDotenv } from 'dotenv';
import dotenv from "dotenv";
dotenv.config()

const app=express();
const mongoUrl = process.env.MONGO_DB_URL


mongoose.connect(mongoUrl,{})
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("database connected");
    
})


app.use(bodyParser.json())
app.use((req,res,next)=>{
    const token=req.header("Authorization")?.replace("Bearer ", "")
    console.log(token);
    
    if(token!=null){
        jwt.verify(token,process.env.SECRET,(error,decoded)=>{
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
