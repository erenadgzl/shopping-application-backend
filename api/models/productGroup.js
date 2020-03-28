const mongoose = require('mongoose');

  const productGroupSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        product:{type:mongoose.Schema.Types.ObjectId, ref:'Product' ,required:true},
        productGroupExp:{type:mongoose.Schema.Types.ObjectId, ref:'ProductGroupExp' ,required:true},
  });

  module.exports=mongoose.model('ProductGroup',productGroupSchema)