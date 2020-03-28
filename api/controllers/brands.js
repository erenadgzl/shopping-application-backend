const mongoose = require('mongoose');
const Brand=require("../models/brand")
const UserType=require("../models/userType")

const APP_URL="http://localhost:3000"

exports.brands_get_all = (req,res,next)=>{
    
 //  UserType.findById(req.userData.userType).exec().then(
      //  result=>{
      //      if(result.type===1){
            Brand.find()
            .exec()
            .then(docs=>{
             res.status(200).json({
                count: docs.length,
                brands: docs.map(doc=>{
                    return {
                   _id:doc._id,
                   created_at:(doc._id).getTimestamp(),                   
                   name:doc.name,
                   description:doc.description,
                   request:{
                       type:'GET',
                       url:APP_URL+'/brands/'+doc._id
                   }
                    }
                })
            }) 
            })
     //       }else {
     //           res.status(401).json(
      //              "Unauthorized"
      //          )
      //      }
   //     }
 //   )
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
}

exports.brands_create_brand = (req,res,next)=>{
    const brand=new Brand({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description:req.body.description
    })
    brand.save().then(result=>{
       
        res.status(201).json({
            message:'Created brand successfully',
            createdBrand: {
                _id: result._id,
                name: result.name,
                description:result.description,
                request:{
                    type:'GET',
                    url: APP_URL+'/brands/'+result._id
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

exports.brands_get_brand = (req,res,next)=>{
    const id=req.params.brandId
    Brand.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   brand:doc,
                   request:'GET',
                   url:APP_URL+'/brands/'+doc._id
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

exports.brands_delete_brand = (req,res,next)=>{
    const id=req.params.brandId
    
    Brand.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Brand deleted',
            request:{
                type:'POST',
                url:APP_URL+'/brands/'+id,
                body:{name:'String',description:'String'}
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

exports.brands_update_brand = (req,res,next)=>{
    const id=req.params.brandId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Brand.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Brand updated",
            request:{
                type:"GET",
                url:APP_URL+'/brands/'+id
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
