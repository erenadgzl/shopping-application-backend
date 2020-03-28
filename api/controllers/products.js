const Product=require("../models/product")
const Brand=require("../models/brand")
const Category=require("../models/category")
const mongoose = require('mongoose');

const fs = require('fs');

const APP_URL="http://localhost:3000"

exports.products_get_all = (req,res,next)=>{
    var perPage = 24;
    var page = 1;
    var categoryId
    var x
    var sumcount
    var sortid=1
    if(req.query.sort )
    sortid = req.query.sort
    if(req.query.limit > 0 && req.query.limit < 101)
    perPage = req.query.limit
    if(req.query.page)
    page=req.query.page
    if(req.query.category){
        Category.findOne({_id: req.query.category}, function(err, document) {
            if(document!==null){
                if(document.node_id == 0){
                    Category.find({node_id:document._id})
                    .select('_id')
                    .exec()
                    .then(results=>{
                        var array=[]
                        for (var i = 0; i < results.length; i++) {
                            array[i]=results[i]._id
                        }
                        x={category:array}
                        find(x)
                    })
                    
                }else{
                    categoryId=document._id
                    x={category:categoryId}
                    find(x)
                }
            }else{
                res.status(404).json({message:"Not found"})
            }
           
          });
    }else{
        find()
    }
    function find(cid) {
        Product.find(cid).count(function (e, count) {
            sumcount=count
          });
        Product.find(cid)
        .sort({_id: sortid})
        .select('-__v')
        .limit(parseInt(perPage))
        .skip(perPage * (page-1))
        .exec()
        .then(results=>{
            const response ={
                sumcount:sumcount,
                count: results.length,
                products : results.map(result=>{
                    return {
                        _id: result._id,
                        kod: result.kod,
                        name: result.name,
                        description: result.description,
                        productImage: result.productImage,
                        category: result.category,
                        brand: result.brand,
                        status: result.status,
                        request:{
                            type:'GET',
                            description:"GET ALL PRODUCTS",
                            url: APP_URL+'/products/'+result._id
                        }
                    }
                })
            }
           // if(docs.length>=0){
                res.status(200).json(response)
           // //}else {
           //     
           // }
           
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })
    }
    
    
}

exports.products_create_product = (req,res,next)=>{
    const product=new Product({
        _id: new mongoose.Types.ObjectId(),
        kod: req.body.kod,
        name: req.body.name,
        description: req.body.description,
        productImage: req.file.path,
        category: req.body.category,
        brand: req.body.brand,
        status: req.body.status,
    })
    product.save().then(result=>{
        
        res.status(201).json({
            message:'Created product successfully',
            createdProduct: {
                _id: result._id,
                kod: result.kod,
                name: result.name,
                description: result.description,
                productImage: result.productImage,
                category: result.category,
                brand: result.brand,
                status: result.status,
                request:{
                    type:'GET',
                    url: APP_URL+'/products/'+result._id
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

exports.products_get_product = (req,res,next)=>{
    const id=req.params.productId
    Product.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   product:doc,
                   request:'GET',
                   url:APP_URL+'/products/'+doc._id
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

exports.products_update_product = (req,res,next)=>{
    const id=req.params.productId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Product.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
     
        res.status(200).json({
            message:"Product updated",
            request:{
                type:"GET",
                url:APP_URL+'/products/'+id
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

exports.products_delete_product = (req,res,next)=>{
    const id=req.params.productId
    Product.findById(id)
    .select('productImage')
    .exec()
    .then(doc=>{
            if (doc) {
                fs.unlinkSync(doc.productImage);
            } 
        })
    .catch(
        err=>{
        console.log(err)
        res.status(500).json({error:err})
        })
        
    Product.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Product deleted',
            request:{
                type:'POST',
                url:APP_URL+'/products/'+id,
                body:{kod:'String',name:'String',description:'String',productImage:'String',
                category:'ObjectId',brand:'ObjectId',status:'Boolean'}
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

exports.products_update_productImage = (req,res,next)=>{
    const id=req.params.productId
    Product.findById(id)
    .select('productImage')
    .exec()
    .then(doc=>{
            if (doc) {
                fs.unlinkSync(doc.productImage);
            } 
        })
    .catch(
        err=>{
        console.log(err)
        res.status(500).json({error:err})
        })
    Product.update({_id:id},{productImage:req.file.path})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Product image updated",
            
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
}