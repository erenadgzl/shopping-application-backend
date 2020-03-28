const mongoose = require('mongoose');

const Product=require("../models/product")
const ProductGroup=require("../models/productGroup")
const ProductGroupExp=require("../models/productGroupExp")

const APP_URL="http://localhost:3000"

exports.productGroups_get_all =(req,res,next)=>{
    ProductGroup.find()
    .populate("productGroupExp","name")
    .populate("product","name")
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           ProductGroup: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),        
                   product:doc.product,
                   productGroupExp:doc.productGroupExp,
                   request:{
                       type:'GET',
                       url:APP_URL+'/productGroups/'+doc._id
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

exports.productGroups_create_productGroup = (req,res,next)=>{
    productId=req.body.productId
    groupExpId=req.body.groupExpId
    Product.findById(productId)
    .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:'Product not found'
                })
            }
            ProductGroupExp.findById(groupExpId)
            .then(doc=>{
                if(!doc){
                    return res.status(404).json({
                        message:'Group explaination not found'
                    })
                }
                
                const productGroup=new ProductGroup({
                    _id:new mongoose.Types.ObjectId(),
                    product:productId,
                    productGroupExp:groupExpId
                })
                return productGroup.save()
            })
            .then(result=>{
                
                res.status(201).json({
                    message:'Product added group.',
                    ProductGroup:{
                        _id:result._id,
                        product:result.product,
                        productGroupExp:result.productGroupExp
                    },
                    request:{
                        type:'GET',
                        url:APP_URL+'/productGroups/'+result._id 
                    }
                })
            })    
    })
    .catch(err=>{
        res.status(500).json({
            message:'Product or Group explanation not found',
            error:err
        })
    })
    
}

exports.productGroups_get_productGroup = (req,res,next)=>{
    ProductGroup.findById(req.params.groupId)
    .populate('product')  //show in group' product detail
    .populate('productGroupExp')
    .exec()
    .then(group=>{
        if(!group){
            return res.status(404).json({
                message:'Group not found'
            })
        }
        res.status(200).json({
            group:group,
            request:{
                type:'GET',
                url:APP_URL+'/productGroups'
            }
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
}

exports.productGroups_update_productGroup = (req,res,next)=>{
    const id=req.params.groupId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ProductGroup.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Group updated",
            request:{
                type:"GET",
                url:APP_URL+'/productGroups/'+id
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

exports.productGroups_delete_productGroup = (req,res,next)=>{
    const id=req.params.groupId
    ProductGroup.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Group deleted',
            request:{
                type:'POST',
                url:APP_URL+'/productGroups/'+id,
                body:{product:'ObjectId',productGroupExp:'ObjectId'}
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