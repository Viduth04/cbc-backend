//import Product from "../models/Product.js";
import express from "express";
import { getProduct, createProducts, deleteProduct,getProductByName } from "../controllers/productcontroller.js";


const productRouter=express.Router();
productRouter.get('/',getProduct)
productRouter.get("/:name",getProductByName)
productRouter.post('/',createProducts)
productRouter.delete("/",deleteProduct)
export default productRouter;