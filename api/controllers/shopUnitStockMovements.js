const mongoose = require('mongoose');
const ShopUnitStockMovement=require("../models/shopUnitStockMovement")

const APP_URL="http://localhost:3000"

exports.shopUnitStockMovements_get_all = (req,res,next)=>{
    ShopUnitStockMovement.find()
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           shopUnitStockMovements: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   shopUnit:doc.shopUnit,
                   product:doc.product,
                   quantity:doc.quantity,
                   movement_type:doc.movement_type,
                   request:{
                       type:'GET',
                       url:APP_URL+'/shopUnitStockMovements/'+doc._id
                   }
               }
           })
       }) 
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
}

exports.shopUnitStockMovements_create_shopUnitStockMovement = (req,res,next)=>{
    const shopUnitStockMovement=new ShopUnitStockMovement({
        _id: new mongoose.Types.ObjectId(),
        shopUnit:req.body.shopUnit,
        product:req.body.product,
        quantity:req.body.quantity,
        movement_type:req.body.movement_type,
    })
    shopUnitStockMovement.save().then(result=>{
        
        res.status(201).json({
            message:'Created Shop Unit Stock Movement successfully',
            createdshopUnitStockMovement: {
                _id: result._id,
                shopUnit:result.shopUnit,
                product:result.product,
                quantity:result.quantity,
                movement_type:result.movement_type,
                request:{
                    type:'GET',
                    url: APP_URL+'/shopUnitStockMovements/'+result._id
                }
            }
        })
    }).catch(err=>
        {
        console.log(err)
        res.status(500).json({
            error:err
        })
        })    
}

exports.shopUnitStockMovements_get_shopUnitStockMovement = (req,res,next)=>{
    const id=req.params.shopUnitStockMovementId
    ShopUnitStockMovement.findById(id)
    .select("-__v")
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   shopUnitStockMovement:doc,
                   request:'GET',
                   url:APP_URL+'/shopUnitStockMovements/'+doc._id
               }) 
            } else {
               res.status(404).json({message:"No valid entry found for provided ID"}) 
            }    
        })
    .catch(
        err=>{
        console.log(err)
        res.status(500).json({error:err})
        })
}

exports.shopUnitStockMovements_update_shopUnitStockMovement = (req,res,next)=>{
    const id=req.params.shopUnitStockMovementId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ShopUnitStockMovement.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Shop Unit Stock Movement updated",
            request:{
                type:"GET",
                url:APP_URL+'/shopUnitStockMovements/'+result._id
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
}

exports.shopUnitStockMovements_delete_shopUnitStockMovement = (req,res,next)=>{
    const id=req.params.shopUnitStockMovementId
    ShopUnitStockMovement.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Shop Unit Stock Movement deleted',
            request:{
                type:'POST',
                url:APP_URL+'/shopUnitStockMovements/'+id,
                body:{shopUnit:'ObjectId',product:'ObjectId',quantity:'Number',movement_type:'Number'}
            }
            
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
           error:err 
        })
    })
    
}