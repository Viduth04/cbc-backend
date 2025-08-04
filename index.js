import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//import Student from './models/student.js';


import userRouter from './routes/userRouter.js'; 
import jwt from "jsonwebtoken";
//import { configDotenv } from 'dotenv';
import dotenv from "dotenv";
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';

dotenv.config()

const app=express();
const mongoUrl = process.env.MONGO_DB_URL

app.use(cors());

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


app.use("/users",userRouter)
app.use("/products",productRouter)
app.use("/orders",orderRouter)

app.listen(
    3000,()=>{
        console.log('server running on port 3000');
        
    }
)
