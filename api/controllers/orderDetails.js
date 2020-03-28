const mongoose = require('mongoose');
const OrderDetail=require("../models/orderDetail")
const Order=require("../models/order")

const APP_URL="http://localhost:3000"

exports.orderDetails_get_all = (req,res,next)=>{
    var uId
    if(req.query.guid){
        Order.findOne({_id: req.query.guid}, function(err, document) {
            if(document!==null){
                uId=document._id
            var x={order:uId}
            find(x)
            }else{
                res.status(404).json({message:"Not found"})
            }
           
          });
    }else{
        find()
    }
    function find(uid) {
    OrderDetail.find(uid)
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           orderDetails: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   order:doc.order,
                   product:doc.product,
                   quantity:doc.quantity,
                   productProperty:doc.productProperty,
                   amount:doc.amount,
                   request:{
                       type:'GET',
                       url:APP_URL+'/orderDetails/'+doc._id
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
}

exports.orderDetails_create_orderDetail = (req,res,next)=>{
    const orderDetail=new OrderDetail({
        _id: new mongoose.Types.ObjectId(),
        order:req.body.order,
        product:req.body.product,
        quantity:req.body.quantity,
        productProperty:req.body.productProperty,       
        amount:req.body.amount
    })
    orderDetail.save().then(result=>{
        
        res.status(201).json({
            message:'Created order detail successfully',
            createdOrderDetail: {
                _id: result._id,
                order: result.order,
                product: result.product,
                quantity: result.quantity,
                productProperty: result.productProperty,
                amount: result.amount,
                request:{
                    type:'GET',
                    url: APP_URL+'/orderDetails/'+result._id
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

exports.orderDetails_get_orderDetail = (req,res,next)=>{
    const id=req.params.orderDetailId
    OrderDetail.findById(id)
    .select("-__v")
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   orderDetail:doc,
                   request:'GET',
                   url:APP_URL+'/orderDetails/'+doc._id
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

exports.orderDetails_update_orderDetail = (req,res,next)=>{
    const id=req.params.orderDetailId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    OrderDetail.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Order detail updated",
            request:{
                type:"GET",
                url:APP_URL+'/orderDetails/'+result._id
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

exports.orderDetails_delete_orderDetail = (req,res,next)=>{
    const id=req.params.orderDetailId
    OrderDetail.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Order detail deleted',
            request:{
                type:'POST',
                url:APP_URL+'/orderDetails/'+id,
                body:{order:'ObjectId',product:'ObjectId',quantity:'Number',productProperty:'ObjectId',amount:'Number'}
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