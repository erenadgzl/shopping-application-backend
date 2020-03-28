const mongoose = require('mongoose');
const Adress=require("../models/address")

const APP_URL="http://localhost:3000"

exports.adresses_get_all = (req,res,next)=>{
    Adress.find()
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           Address: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   description:doc.description,
                   neighborhood:doc.neighborhood,
                   district:doc.district,
                   city:doc.city,
                   request:{
                       type:'GET',
                       url:APP_URL+'/addresses/'+doc._id
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

exports.adresses_create_adress = (req,res,next)=>{
    const adress=new Adress({
        _id: new mongoose.Types.ObjectId(),
        city: req.body.city,
        district: req.body.district,
        neighborhood: req.body.neighborhood,
        description: req.body.description
    })
    adress.save().then(result=>{
        
        res.status(201).json({
            message:'Created address successfully',
            createdAddress: {
                _id:result._id,                   
                description:result.description,
                neighborhood:result.neighborhood,
                district:result.district,
                city:result.city,
                request:{
                    type:'GET',
                    url:APP_URL+'/addresses/'+result._id
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

exports.adresses_get_adress = (req,res,next)=>{
    const id=req.params.addressId
    Adress.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
           
            if (doc) {
               res.status(200).json({
                address:doc,
                   request:'GET',
                   url:APP_URL+'/addresses/'+doc._id
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

exports.adresses_delete_adress = (req,res,next)=>{
    const id=req.params.addressId
    Adress.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Address deleted',
            request:{
                type:'POST',
                url:APP_URL+'/addresses/'+id,
                body:{description:'String',neighborhood:'ObjectId',district:'ObjectId',city:'ObjectId'}
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

exports.adresses_update_adress = (req,res,next)=>{
    const id=req.params.addressId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Adress.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Address updated",
            request:{
                type:"GET",
                url:APP_URL+'/addresses/'+id
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