const mongoose = require('mongoose');
const District=require("../models/district")

const APP_URL="http://localhost:3000"

exports.districts_get_all = (req,res,next)=>{

    if(req.query.code){
        x={code:code}
        find(x)
    }else{
        find()
    }
    function find(id){
        District.find(id)
        .exec()
        .then(docs=>{
           res.status(200).json({
               count: docs.length,
               District: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       name:doc.name,
                       code:doc.code,
                       request:{
                           type:'GET',
                           url:APP_URL+'/districts/'+doc._id
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

exports.districts_create_district = (req,res,next)=>{
    const district=new District({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code
    })
    district.save().then(result=>{
        
        res.status(201).json({
            message:'Created district successfully',
            createdDistrict: {
                _id: result._id,
                name: result.name,
                code: result.code,
                request:{
                    type:'GET',
                    url: APP_URL+'/districts/'+result._id
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

exports.districts_get_district = (req,res,next)=>{
    const id=req.params.districtId
    District.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   district:doc,
                   request:'GET',
                   url:APP_URL+'/districts/'+doc._id
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

exports.districts_delete_district = (req,res,next)=>{
    const id=req.params.districtId
    District.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'District deleted',
            request:{
                type:'POST',
                url:APP_URL+'/districts/'+id,
                body:{name:'String',code:'Number'}
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

exports.districts_update_district = (req,res,next)=>{
    const id=req.params.districtId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    District.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"District updated",
            request:{
                type:"GET",
                url:APP_URL+'/districts/'+id
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