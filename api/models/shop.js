const mongoose = require('mongoose');

  const shopSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {type:String, required: true},
        user: { type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
        logo: { type:String },
        description: { type:String }
  });

  module.exports=mongoose.model('Shop',shopSchema)