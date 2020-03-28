const mongoose = require('mongoose');
const ProductGroupExp=require("../models/productGroupExp")

const APP_URL="http://localhost:3000"

exports.productGroupExps_get_all = (req,res,next)=>{
    ProductGroupExp.find()
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           ProductGroupExp: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   name:doc.name,
                   description:doc.description,
                   groupType:doc.groupType,
                   request:{
                       type:'GET',
                       url:APP_URL+'/productGroupExps/'+doc._id
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

exports.productGroupExps_get_groupExp = (req,res,next)=>{
    const id=req.params.groupExpId
    ProductGroupExp.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   productGroupExps:doc,
                   request:'GET',
                   url:APP_URL+'/productGroupExps/'+doc._id
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

exports.productGroupExps_create_groupExp = (req,res,next)=>{
    const productGroupExp=new ProductGroupExp({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        groupType: req.body.groupType
    })
    productGroupExp.save().then(result=>{
      
        res.status(201).json({
            message:'Created group explanation successfully',
            createdproductGroupExp: {
                _id: result._id,
                name: result.name,
                groupType: result.groupType,
                description:result.description,
                request:{
                    type:'GET',
                    url: APP_URL+'/productGroupExps/'+result._id
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

exports.productGroupExps_update_groupExp = (req,res,next)=>{
    const id=req.params.groupExpId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    ProductGroupExp.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
       
        res.status(200).json({
            message:"Group explanation updated",
            request:{
                type:"GET",
                url:APP_URL+'/productGroupExps/'+id
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

exports.productGroupExps_delete_groupExp = (req,res,next)=>{
    const id=req.params.groupExpId
    ProductGroupExp.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Group explanation deleted',
            request:{
                type:'POST',
                url:APP_URL+'/productGroupExps/'+id,
                body:{name:'String',description:'String',groupType:'Number'}
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