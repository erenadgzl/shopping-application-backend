const mongoose = require('mongoose');
const Category=require("../models/category")

const APP_URL="http://localhost:3000"

exports.categories_get_all = (req,res,next)=>{
    Category.find()
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           categories: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   node_id:doc.node_id,
                   name:doc.name,
                   sequence:doc.sequence,
                   status:doc.status,
                   request:{
                       type:'GET',
                       url:APP_URL+'/categories/'+doc._id
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

exports.categories_create_category = (req,res,next)=>{
    const category=new Category({
        _id: new mongoose.Types.ObjectId(),
        node_id:req.body.node_id,
        name:req.body.name,
        sequence:req.body.sequence,
        status:req.body.status
    })
    category.save().then(result=>{
        
        res.status(201).json({
            message:'Created category successfully',
            createdCategory: {
                _id: result._id,
                node_id: result.node_id,
                name: result.name,
                sequence: result.sequence,
                status: result.status,
                request:{
                    type:'GET',
                    url: APP_URL+'/categories/'+result._id
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

exports.categories_get_category = (req,res,next)=>{
    const id=req.params.categoryId
    Category.findById(id)
    .select("-__v")
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   category:doc,
                   request:'GET',
                   url:APP_URL+'/categories/'+doc._id
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

exports.categories_update_category = (req,res,next)=>{
    const id=req.params.categoryId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Category.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Category updated",
            request:{
                type:"GET",
                url:APP_URL+'/categories/'+result._id
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

exports.categories_delete_category = (req,res,next)=>{
    const id=req.params.categoryId
    Category.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Category deleted',
            request:{
                type:'POST',
                url:APP_URL+'/categories/'+id,
                body:{node_id:'Number',name:'String',sequence:'Number',status:'Boolean'}
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