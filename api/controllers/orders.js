const mongoose = require('mongoose');
const Order=require("../models/order")

const APP_URL="http://localhost:3000"

exports.orders_get_all = (req,res,next)=>{
    var perPage = 24;
    var page = 1;
    var sortid=1;
    var x
    var sumcount
    
    if(req.query.sort )
    sortid = req.query.sort
    if(req.query.limit > 0 && req.query.limit < 101)
    perPage = req.query.limit
    if(req.query.page)
    page=req.query.page

    if(req.query.shopUnit){
        x={shopUnit:req.query.shopUnit}
        find(x)
    }else if(req.query.user){
        x={user:req.query.user}
        find(x)
    }else{
        find()
    }

    function find(id){
        Order.find(id).count(function (e, count) {
            sumcount=count
          });
        Order.find(id)
        .sort({_id: sortid})
        .select('-__v')
        .limit(parseInt(perPage))
        .skip(perPage * (page-1))
        .exec()
        .then(docs=>{
           res.status(200).json({ 
               sumcount:sumcount,
               count: docs.length,
               orders: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       shopUnit:doc.shopUnit,
                       guid:doc.guid,
                       user:doc.user,
                       total_amount:doc.total_amount,
                       address:doc.address,
                       payment_type:doc.payment_type,
                       order_status:doc.order_status,
                       order_active:doc.order_active,
                       request:{
                           type:'GET',
                           url:APP_URL+'/orders/'+doc._id
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

exports.orders_create_order = (req,res,next)=>{
    const order=new Order({
        _id: new mongoose.Types.ObjectId(),
        shopUnit:req.body.shopUnit,
        guid:req.body.guid,
        user:req.body.user,
        total_amount:req.body.total_amount,
        address:req.body.address,
        payment_type:req.body.payment_type,
        order_status:req.body.order_status,
        order_active:req.body.order_active
    })
    order.save().then(result=>{
        
        res.status(201).json({
            message:'Created order successfully',
            createdOrder: {
                _id: result._id,
                shopUnit:result.shopUnit,
                guid:result.guid,
                user:result.user,
                total_amount:result.total_amount,
                address:result.address,
                payment_type:result.payment_type,
                order_status:result.order_status,
                order_active:result.order_active,
                request:{
                    type:'GET',
                    url: APP_URL+'/orders/'+result._id
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

exports.orders_get_order = (req,res,next)=>{
    const id=req.params.orderId
    Order.findById(id)
    .select("-__v")
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   order:doc,
                   request:'GET',
                   url:APP_URL+'/orders/'+doc._id
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

exports.orders_update_order = (req,res,next)=>{
    const id=req.params.orderId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Order.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Order updated",
            request:{
                type:"GET",
                url:APP_URL+'/orders/'+result._id
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

exports.orders_delete_order = (req,res,next)=>{
    const id=req.params.orderId
    Order.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Order deleted',
            request:{
                type:'POST',
                url:APP_URL+'/orders/'+id,
                body:{shopUnit:'ObjectId',guid:'String',user:'ObjectId',total_amount:'Number',address:'String'
                ,payment_type:'Number',order_status:'Number',order_active:'Number'}
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