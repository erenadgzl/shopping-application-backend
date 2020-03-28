const mongoose = require('mongoose');

  const userAddressSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        user: { type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
        address: { type:mongoose.Schema.Types.ObjectId, ref:'Address' ,required:true},
        name: {type:String, required: true}
  });

  module.exports=mongoose.model('UserAddress',userAddressSchema)