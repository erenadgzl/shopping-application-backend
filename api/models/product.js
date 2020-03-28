const mongoose = require('mongoose');

  const productSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        kod: {type:String},
        name: {type:String,required: true},
        description: {type:String,required: true},
        productImage: {type:String, required:true},
        category:{type:mongoose.Schema.Types.ObjectId, ref:'Category' ,required:true},
        brand:{type:mongoose.Schema.Types.ObjectId, ref:'Brand' ,required:true},
        status:{type:Boolean,default:true},
  });

  module.exports=mongoose.model('Product',productSchema)