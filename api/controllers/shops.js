const mongoose = require('mongoose');
const Shop=require("../models/shop")

const APP_URL="http://localhost:3000"

exports.shops_get_all = (req,res,next)=>{

    if(req.query.user){       
            var x={user:req.query.user}
            find(x)      
    }else {
        find()
    }
    function find(x){
        Shop.find(x)
        .exec()
        .then(docs=>{
           res.status(200).json({
               count: docs.length,
               shop: docs.map(doc=>{
                   return {
                       _id:doc._id,
                       created_at:(doc._id).getTimestamp(),                   
                       name:doc.name,
                       user:doc.user,
                       logo:doc.logo,
                       description:doc.description,
                       request:{
                           type:'GET',
                           url:APP_URL+'/shops/'+doc._id
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

exports.shops_create_shop = (req,res,next)=>{
    const shop=new Shop({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user: req.body.user,
        logo: req.file.path,
        description: req.body.description
    })
    shop.save().then(result=>{
        
        res.status(201).json({
            message:'Created shop successfully',
            createdShop: {
                _id: result._id,
                name: result.name,
                user:result.user,
                logo:result.logo,
                description:result.description,
                request:{
                    type:'GET',
                    url: APP_URL+'/shops/'+result._id
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

exports.shops_get_shop = (req,res,next)=>{
    const id=req.params.shopId
    Shop.findById(id)
    .select('-__v')
    .exec()
    .then(doc=>{
            
            if (doc) {
               res.status(200).json({
                   shop:doc,
                   request:'GET',
                   url:APP_URL+'/shops/'+doc._id
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

exports.shops_delete_shop = (req,res,next)=>{
    const id=req.params.shopId
    Shop.findById(id)
    .select('logo')
    .exec()
    .then(doc=>{
            if (doc) {
                fs.unlinkSync(doc.logo);
            }
        })
    .catch(
        err=>{
        console.log(err)
        res.status(500).json({error:err})
        })
    Shop.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'Shop deleted',
            request:{
                type:'POST',
                url:APP_URL+'/shops/'+id,
                body:{name:'String',user:'ObjectId',logo:'String',description:'String'}
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

exports.shops_update_shop = (req,res,next)=>{
    const id=req.params.shopId
    const updateOps={}
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Shop.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Shop updated",
            request:{
                type:"GET",
                url:APP_URL+'/shops/'+id
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

exports.shops_update_logo = (req,res,next)=>{
    const id=req.params.shopId
    Shop.findById(id)
    .select('logo')
    .exec()
    .then(doc=>{
            if (doc) {
                fs.unlinkSync(doc.logo);
            } 
        })
    .catch(
        err=>{
        console.log(err)
        res.status(500).json({error:err})
        })
    Shop.update({_id:id},{logo:req.file.path})
    .exec()
    .then(result=>{
        
        res.status(200).json({
            message:"Shop logo updated",           
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
}