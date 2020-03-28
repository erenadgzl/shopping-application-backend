const mongoose = require('mongoose');
const UserAddress=require("../models/userAddress")

const APP_URL="http://localhost:3000"

exports.userAddresses_get_all = (req,res,next)=>{

    var userID

    if(req.query.user){
        userID={user: req.query.user}
        find(userID)
    }else{
        find()
    }

    function find(cid){
        UserAddress.find(cid)
        .exec()
        .then(docs=>{
           res.status(200).json({
               count: docs.length,
               UserAddresses: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       name:doc.name,
                       user:doc.user,                
                       address:doc.address,
                       request:{
                           type:'GET',
                           url:APP_URL+'/userAddresses/'+doc._id
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

exports.userAddresses_create_userAddress = (req,res,next)=>{
    const userAddress=new UserAddress({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        address: req.body.address,
        user: req.body.user
    })
    userAddress.save().then(result=>{
        res.status(201).json({
            message:'Created user addresses successfully',
            createdAddress: {
                _id: result._id,
                name: result.name,
                address: result.address,                
                user: result.user,
                request:{
                    type:'GET',
                    url: APP_URL+'/userAddresses/'+result._id
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

exports.userAddresses_get_userAddress = (req,res,next)=>{
    const id=req.params.userAddressId
    UserAddress.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   userAddress:doc,
                   request:'GET',
                   url:APP_URL+'/userAddresses/'+doc._id
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

exports.userAddresses_delete_userAddress = (req,res,next)=>{
    const id=req.params.userAddressId
    UserAddress.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'User address deleted',
            request:{
                type:'POST',
                url:APP_URL+'/userAddresses/'+id,
                body:{name:'String',user:'ObjectId',address:'ObjectId'}
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

exports.userAddresses_update_userAddress = (req,res,next)=>{
    const id=req.params.userAddressId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    UserAddress.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"User address updated",
            request:{
                type:"GET",
                url:APP_URL+'/userAddresses/'+id
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