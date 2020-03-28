const mongoose = require('mongoose');
const ShopUnit=require("../models/shopUnit")
const Shop=require("../models/shop")

const APP_URL="http://localhost:3000"

exports.shopUnits_get_all = (req,res,next)=>{
    
    if(req.query.user){       
        Shop.findOne({user: req.query.user}, function(err, document) {
            if(document!==null){
                uId=document._id
            var x={shop:uId}
            find(x)
            }else{
                res.status(404).json({message:"Not found"})
            }
           
          });      
    }else {
        find()
    }
    function find(x){
        ShopUnit.find(x)
        .exec()
        .then(docs=>{
           res.status(200).json({
               count: docs.length,
               shopUnit: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       name:doc.name,
                       shop:doc.shop,
                       address:doc.address,
                       min_order:doc.min_order,
                       phone:doc.phone,
                       email:doc.email,
                       description:doc.description,
                       status:doc.status,
                       request:{
                           type:'GET',
                           url:APP_URL+'/shopUnits/'+doc._id
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

exports.shopUnits_create_shop = (req,res,next)=>{
    const shopUnit=new ShopUnit({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        shop: req.body.shop,
        address: req.body.address,
        min_order: req.body.min_order,
        phone: req.body.phone,
        email: req.body.email,
        description: req.body.description,
        status:req.body.status
    })
    shopUnit.save().then(result=>{
        
        res.status(201).json({
            message:'Created shop unit successfully',
            createdshopUnit: {
                    _id: result._id,
                    name:result.name,
                   shop:result.shop,
                   address:result.address,
                   min_order:result.min_order,
                   phone:result.phone,
                   email:result.email,
                   description:result.description,
                   status:result.status,
                request:{
                    type:'GET',
                    url: APP_URL+'/shopUnits/'+result._id
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

exports.shopUnits_get_shopUnit = (req,res,next)=>{
    const id=req.params.shopUnitId
    ShopUnit.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   shopUnit:doc,
                   request:'GET',
                   url:APP_URL+'/shopUnits/'+doc._id
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

exports.shopUnits_delete_shopUnit = (req,res,next)=>{
    const id=req.params.shopUnitId
    ShopUnit.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Shop unit deleted',
            request:{
                type:'POST',
                url:APP_URL+'/shopUnits/'+id,
                body:{name:'String',shop:'ObjectId',address:'ObjectId',min_order:'Number',phone:'String'
                ,email:'String',description:'String',status:'Boolean'}
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

exports.shopUnits_update_shopUnit = (req,res,next)=>{
    const id=req.params.shopUnitId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ShopUnit.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
       
        res.status(200).json({
            message:"Shop unit updated",
            request:{
                type:"GET",
                url:APP_URL+'/shopUnits/'+id
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