import Product from "../models/products.js";

export async function getProduct(req, res){
  const productsList=await Product.find()
  res.json({
    list:productsList
});

}

export function createProducts(req, res){
   console.log(req.user);
   if(req.user==null){
    res.json({
      message:"you are not logged in"
    })
    return
   }

   if(req.user.type!="admin"){
    res.json({
      message:"you are not an Admin"
    })
    return
   }


    const product=new Product(req.body);
    product.save().then(()=>{
     res.json({
         message:"Product Created"
     });
    }).catch(()=>{
     res.json({
         message:"Not Created"
     })
    })
 
    
 }

 export function deleteProduct(req,res){
    Product.deleteOne({name:req.body.name}).then(()=>{
    res.json({
      message:"Deleted it"
    })
  })
 }

 export function getProductByName(req,res){
     const name=req.params.name;
     Product.find({name:name}).then((productsList)=>{
      res.json({
       list:productsList
      })
     }).catch(()=>{
      res.json({
        message:"Error"
      })
     })


 }