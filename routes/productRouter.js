import express from 'express';
import { createProduct, getProducts } from '../controllers/productcontroller.js';

const productRouter =express.Router();

productRouter.post('/',createProduct)
productRouter.get("/",getProducts)

export default productRouter;