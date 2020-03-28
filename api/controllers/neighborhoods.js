const mongoose = require('mongoose');
const Neighborhood=require("../models/neighborhood")

const APP_URL="http://localhost:3000"

exports.neighborhoods_get_all = (req,res,next)=>{

    if(req.query.district){
        x={district:district}
        find(x)
    }else{
        find()
    }

    function find(id){
    Neighborhood.find(id)
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           Neighborhood: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   name:doc.name,
                   District:doc.district,
                   request:{
                       type:'GET',
                       url:APP_URL+'/neighborhoods/'+doc._id
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

exports.neighborhoods_create_neighborhood = (req,res,next)=>{
    const neighborhood=new Neighborhood({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        district: req.body.district
    })
    neighborhood.save().then(result=>{
        
        res.status(201).json({
            message:'Created Neighborhood successfully',
            createdNeighborhood: {
                _id: result._id,
                name: result.name,
                district: result.district,
                request:{
                    type:'GET',
                    url: APP_URL+'/neighborhoods/'+result._id
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

exports.neighborhoods_get_neighborhood = (req,res,next)=>{
    const id=req.params.neighborhoodId
    Neighborhood.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                    Neighborhood:doc,
                   request:'GET',
                   url:APP_URL+'/neighborhoods/'+doc._id
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

exports.neighborhoods_delete_neighborhood = (req,res,next)=>{
    const id=req.params.neighborhoodId
    Neighborhood.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Neighborhood deleted',
            request:{
                type:'POST',
                url:APP_URL+'/neighborhoods/'+id,
                body:{name:'String',district:'ObjectId'}
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

exports.neighborhoods_update_neighborhood = (req,res,next)=>{
    const id=req.params.neighborhoodId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Neighborhood.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Neighborhood updated",
            request:{
                type:"GET",
                url:APP_URL+'/neighborhoods/'+id
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