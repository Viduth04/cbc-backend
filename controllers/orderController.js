import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){
// take the latest product ID


if(!isCustomer(req)){
   return res.json({
        message:"Please login as customer to create order"
    })
}

try{

    const latestOrder=await Order.find().sort
    ({date:-1}).limit(1)
    let orderId

    if(latestOrder.length==0){
        orderId="CBC0001";
    }else{
        const currentOrderId=latestOrder[0].orderId;

        const numberString=currentOrderId.replace("CBC","");

        const number=parseInt(numberString);
        const nextNumber = (number + 1).toString().padStart(4, '0');
        orderId = "CBC" + nextNumber; 
    }

    const newOrderData=req.body
    const newProductArray=[]

    for(let i=0;i<req.body.orderedItems.length;i++){
      //  console.log(req.body.orderedItems[i]);

      const product=await Product.findOne({
        productId: newOrderData.orderedItems[i].productId
      })
       // console.log(product);
        if(product==null){
            res.json({
                message:"product with id "+newOrderData.orderedItems[i].productId+" not found"
            })
            return
        }

        newProductArray[i]={
            name:product.productName,
            price:product.price,
            quantity:newOrderData.orderedItems[i].quantity,
           // image:product.image[0]
         // image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : ""
         image: Array.isArray(product?.images) && product.images.length > 0 ? product.images[0] : ""

        }
       
        
    }
    //console.log(product);
    console.log("Processed all products:", newProductArray);


    newOrderData.orderedItems=newProductArray
    newOrderData.orderId=orderId
    newOrderData.email=req.user.email

    const order=new Order(newOrderData)
    await order.save();
    res.json({
        message:"Order created"
    })

}catch(error){
    res.status(500).json({
        message:error.message
    })
}

}


/*export async function getOrders(req,res) {
    try{
        const orders=await Order.find({email:req.user.email})

        res.json(orders)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
    
}*/
export async function getOrders(req, res) {
    try {
      const orders = await Order.find({ email: req.user.email });
      return res.json(orders); // ✅ return
    } catch (error) {
      return res.status(500).json({ message: error.message }); // ✅ return
    }
  }
  