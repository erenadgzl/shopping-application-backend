const mongoose = require('mongoose');
const ShopUnitServiceAddress=require("../models/shopUnitServiceAddress")

const APP_URL="http://localhost:3000"

exports.ShopUnitServiceAddresses_get_all = (req,res,next)=>{

    if(req.query.shopUnit){
        find({shopUnit:req.query.shopUnit})
    }else if(req.query.neighborhood){
        find({neighborhood:req.query.neighborhood})
    }
    else{
        find()
    }
    function find(id){
        ShopUnitServiceAddress.find(id)
        .exec()
        .then(docs=>{
           res.status(200).json({
               count: docs.length,
               ShopUnitServiceAddress: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       shopUnit:doc.shopUnit,
                       neighborhood:doc.neighborhood,
                       district:doc.district,
                       city:doc.city,
                       request:{
                           type:'GET',
                           url:APP_URL+'/shopUnitServiceAddresses/'+doc._id
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

exports.ShopUnitServiceAddresses_create_ShopUnitServiceAddress = (req,res,next)=>{
    const shopUnitServiceAddress=new ShopUnitServiceAddress({
        _id: new mongoose.Types.ObjectId(),
        city: req.body.city,
        district: req.body.district,
        neighborhood: req.body.neighborhood,
        shopUnit: req.body.shopUnit
    })
    shopUnitServiceAddress.save().then(result=>{
        
        res.status(201).json({
            message:'Created address successfully',
            createdAddress: {
                _id:result._id,                   
                shopUnit:result.shopUnit,
                neighborhood:result.neighborhood,
                district:result.district,
                city:result.city,
                request:{
                    type:'GET',
                    url:APP_URL+'/shopUnitServiceAddresses/'+result._id
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

exports.ShopUnitServiceAddresses_get_adress = (req,res,next)=>{
    const id=req.params.shopUnitServiceAddressId
    ShopUnitServiceAddress.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                ShopUnitServiceAddress:doc,
                   request:'GET',
                   url:APP_URL+'/shopUnitServiceAddresses/'+doc._id
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

exports.ShopUnitServiceAddresses_delete_ShopUnitServiceAddress = (req,res,next)=>{
    const id=req.params.shopUnitServiceAddressId
    ShopUnitServiceAddress.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Address deleted',
            request:{
                type:'POST',
                url:APP_URL+'/shopUnitServiceAddresses/'+id,
                body:{shopUnit:'ObjectId',neighborhood:'ObjectId',district:'ObjectId',city:'ObjectId'}
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

exports.ShopUnitServiceAddresses_update_ShopUnitServiceAddress = (req,res,next)=>{
    const id=req.params.shopUnitServiceAddressId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ShopUnitServiceAddress.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Address updated",
            request:{
                type:"GET",
                url:APP_URL+'/shopUnitServiceAddresses/'+id
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