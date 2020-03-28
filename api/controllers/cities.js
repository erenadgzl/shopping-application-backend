const mongoose = require('mongoose');
const City=require("../models/city")

const APP_URL="http://localhost:3000"

exports.cities_get_all = (req,res,next)=>{
    City.find()
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           city: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   name:doc.name,
                   code:doc.code,
                   request:{
                       type:'GET',
                       url:APP_URL+'/cities/'+doc._id
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

exports.cities_create_city = (req,res,next)=>{
    const city=new City({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code
    })
    city.save().then(result=>{
        
        res.status(201).json({
            message:'Created city successfully',
            createdCity: {
                _id: result._id,
                name: result.name,
                code: result.code,
                request:{
                    type:'GET',
                    url: APP_URL+'/cities/'+result._id
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

exports.cities_get_city = (req,res,next)=>{
    const id=req.params.cityId
    City.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   city:doc,
                   request:'GET',
                   url:APP_URL+'/cities/'+doc._id
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

exports.cities_delete_city = (req,res,next)=>{
    const id=req.params.cityId
    City.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'City deleted',
            request:{
                type:'POST',
                url:APP_URL+'/cities/'+id,
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

exports.cities_update_city = (req,res,next)=>{
    const id=req.params.cityId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    City.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"City updated",
            request:{
                type:"GET",
                url:APP_URL+'/cities/'+id
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