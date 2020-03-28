const mongoose = require('mongoose');
const ShopUnitStock=require("../models/shopUnitStock")
const ShopUnit=require("../models/shopUnit")
const Product=require("../models/product")

const APP_URL="http://localhost:3000"

exports.shopUnitStocks_get_all = (req,res,next)=>{
    var perPage = 24;
    var page = 1;

    var sumcount
    if(req.query.limit > 0 && req.query.limit < 101)
    perPage = req.query.limit
    if(req.query.page)
    page=req.query.page

    var uId
    if(req.query.shopUnit){
        ShopUnit.findOne({_id: req.query.shopUnit}, function(err, document) {
            try {
                if(document!==null){
                uId=document._id
            var x={shopUnit:uId}
            if(req.query.product){
                x={shopUnit:uId,product:req.query.product}
                
                find(x)
            }else{
                find(x)
            }
            
            
            }else{
                res.status(404).json({message:"Not found"})
            }
        
            } catch (e) {
                return undefined;
            }
            
           
          });
    }else{
        find()
    }

    function find(uid) {
        ShopUnitStock.find(uid).count(function (e, count) {
            sumcount=count
          });
    ShopUnitStock.find(uid)
    .limit(parseInt(perPage))
    .skip(perPage * (page-1))
    .exec()
    .then(docs=>{ 
       res.status(200).json({
            sumcount:sumcount,
           count: docs.length,
           shopUnitStocks: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   shopUnit:doc.shopUnit,
                   product:doc.product,
                   stock:doc.stock,
                   price:doc.price,
                   discount: doc.discount,
                   discount_rate: doc.discount_rate,
                   campaign: doc.campaign,
                   request:{
                       type:'GET',
                       url:APP_URL+'/shopUnitStocks/'+doc._id
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

exports.shopUnitStocks_create_shopUnitStock = (req,res,next)=>{
    const shopUnitStock=new ShopUnitStock({
        _id: new mongoose.Types.ObjectId(),
        shopUnit:req.body.shopUnit,
        product:req.body.product,
        stock:req.body.stock,
        price:req.body.price,
        discount: req.body.discount,
        discount_rate: req.body.discount_rate,
        campaign: req.body.campaign,
    })
    shopUnitStock.save().then(result=>{
        
        res.status(201).json({
            message:'Created Shop Unit Stock successfully',
            createdshopUnitStock: {
                _id: result._id,
                shopUnit:result.shopUnit,
                product:result.product,
                stock:result.stock,
                price:result.price,
                discount: result.discount,
                discount_rate: result.discount_rate,
                campaign: result.campaign,
                request:{
                    type:'GET',
                    url: APP_URL+'/shopUnitStocks/'+result._id
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

exports.shopUnitStocks_get_shopUnitStock = (req,res,next)=>{
    const id=req.params.shopUnitStockId
    ShopUnitStock.findById(id)
    .select("-__v")
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   shopUnitStock:doc,
                   request:'GET',
                   url:APP_URL+'/shopUnitStocks/'+doc._id
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

exports.shopUnitStocks_update_shopUnitStock = (req,res,next)=>{
    const id=req.params.shopUnitStockId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ShopUnitStock.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Shop Unit Stock updated",
            request:{
                type:"GET",
                url:APP_URL+'/shopUnitStocks/'+result._id
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

exports.shopUnitStocks_delete_shopUnitStock = (req,res,next)=>{
    const id=req.params.shopUnitStockId
    ShopUnitStock.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Shop Unit Stock deleted',
            request:{
                type:'POST',
                url:APP_URL+'/shopUnitStocks/'+id,
                body:{shopUnit:'ObjectId',product:'ObjectId',stock:'Number',price:'Number',discount:'Boolean'
                ,discount_rate:'Number',campaign:'Boolean'}
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