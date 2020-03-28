const mongoose = require('mongoose');

  const addressSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        city: { type:mongoose.Schema.Types.ObjectId, ref:'City' ,required:true},
        district: { type:mongoose.Schema.Types.ObjectId, ref:'District' ,required:true},
        neighborhood: { type:mongoose.Schema.Types.ObjectId, ref:'Neighborhood' ,required:true},
        description: {type:String, required: true}
  });

  module.exports=mongoose.model('Address',addressSchema)