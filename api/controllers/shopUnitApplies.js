const mongoose = require('mongoose');
const ShopUnit=require("../models/shopUnit")
const Shop=require("../models/shop")
const ShopUnitApply=require("../models/shopUnitApply")

const APP_URL="http://localhost:3000"

exports.shopUnitApplies_get_all = (req,res,next)=>{
    
    if(req.query.user){       
        Shop.findOne({user: req.query.user}, function(err, document) {
            if(document!==null){
                uId=document._id
            var x={shopUser:uId}
            find(x)
            }else{
                res.status(404).json({message:"Not found"})
            }
           
          });      
    }else {
        find()
    }
    function find(x){
        ShopUnitApply.find(x)
        .exec()
        .then(docs=>{
           res.status(200).json({
               count: docs.length,
               shopUnitApply: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       shopName:doc.shopName,
                       shopUser:doc.shopUser,
                       shopDescription:doc.shopDescription,
                       shopUnitName:doc.shopUnitName,
                       shopUnitAddress:doc.shopUnitAddress,
                       shopUnitMin_order:doc.shopUnitMin_order,
                       shopUnitPhone:doc.shopUnitPhone,
                       shopUnitEmail:doc.shopUnitEmail,
                       shopUnitDescription:doc.shopUnitDescription,
                       status:doc.status,
                       request:{
                           type:'GET',
                           url:APP_URL+'/shopUnitApplies/'+doc._id
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

exports.shopUnitApplies_create_shop = (req,res,next)=>{
    const shopUnitApply=new ShopUnitApply({
        _id: new mongoose.Types.ObjectId(),
        shopName:req.body.shopName,
        shopUser:req.body.shopUser,
        shopDescription:req.body.shopDescription,
        shopUnitName:req.body.shopUnitName,
        shopUnitAddress:req.body.shopUnitAddress,
        shopUnitMin_order:req.body.shopUnitMin_order,
        shopUnitPhone:req.body.shopUnitPhone,
        shopUnitEmail:req.body.shopUnitEmail,
        shopUnitDescription:req.body.shopUnitDescription,
        status:req.body.status,
    })
    shopUnitApply.save().then(result=>{
        
        res.status(201).json({
            message:'Created shop unit apply successfully',
            createdshopUnitApply: {
                    _id: result._id,
                    shopName:result.shopName,
                    shopUser:result.shopUser,
                    shopDescription:result.shopDescription,
                    shopUnitName:result.shopUnitName,
                    shopUnitAddress:result.shopUnitAddress,
                    shopUnitMin_order:result.shopUnitMin_order,
                    shopUnitPhone:result.shopUnitPhone,
                    shopUnitEmail:result.shopUnitEmail,
                    shopUnitDescription:result.shopUnitDescription,
                    status:result.status,
                request:{
                    type:'GET',
                    url: APP_URL+'/shopUnitApplies/'+result._id
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

exports.shopUnitApplies_get_shopUnitApply = (req,res,next)=>{
    const id=req.params.shopUnitApplyId
    ShopUnitApply.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   shopUnitApply:doc,
                   request:'GET',
                   url:APP_URL+'/shopUnitApplies/'+doc._id
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

exports.shopUnitApplies_delete_shopUnitApply = (req,res,next)=>{
    const id=req.params.shopUnitApplyId
    ShopUnitApply.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Shop unit apply deleted',
            request:{
                type:'POST',
                url:APP_URL+'/shopUnitApplies/'+id,
                body:{shopName:'String',shopUser:'ObjectId',shopUnitAddress:'ObjectId',shopDescription:'String'
                ,shopUnitName:'String',shopUnitMin_order:'Number',shopUnitPhone:'String',shopUnitEmail:'String',
                shopUnitDescription:'String',status:'Boolean'}
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

exports.shopUnitApplies_update_shopUnitApply = (req,res,next)=>{
    const id=req.params.shopUnitApplyId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ShopUnitApply.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Shop unit apply updated",
            request:{
                type:"GET",
                url:APP_URL+'/shopUnitApplies/'+id
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