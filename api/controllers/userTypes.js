const mongoose = require('mongoose');
const UserType=require("../models/userType")

const APP_URL="http://localhost:3000"

exports.userTypes_get_all = (req,res,next)=>{
    UserType.find()
    .exec()
    .then(docs=>{
       res.status(200).json({
           count: docs.length,
           userTypes: docs.map(doc=>{
               return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   name:doc.name,
                   type:doc.type,
                   request:{
                       type:'GET',
                       url:APP_URL+'/userTypes/'+doc._id
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

exports.userTypes_create_userType = (req,res,next)=>{
    const userType=new UserType({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type
    })
    userType.save().then(result=>{
        
        res.status(201).json({
            message:'Created userType successfully',
            createdUserType: {
                _id: result._id,
                name: result.name,
                type: result.type,
                request:{
                    type:'GET',
                    url: APP_URL+'/userTypes/'+result._id
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

exports.userTypes_get_userType = (req,res,next)=>{
    const id=req.params.userTypeId
    UserType.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   userType:doc,
                   request:'GET',
                   url:APP_URL+'/userTypes/'+doc._id
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

exports.userTypes_delete_userType = (req,res,next)=>{
    const id=req.params.userTypeId
    UserType.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'User Type deleted',
            request:{
                type:'POST',
                url:APP_URL+'/userTypes/'+id,
                body:{name:'String',type:'Number'}
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

exports.userTypes_update_userType = (req,res,next)=>{
    const id=req.params.userTypeId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    UserType.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
       
        res.status(200).json({
            message:"User Type updated",
            request:{
                type:"GET",
                url:APP_URL+'/userTypes/'+id
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