const mongoose = require('mongoose');

  const shopUnitServiceAddressSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        city: { type:mongoose.Schema.Types.ObjectId, ref:'City' ,required:true},
        district: { type:mongoose.Schema.Types.ObjectId, ref:'District' ,required:true},
        neighborhood: { type:mongoose.Schema.Types.ObjectId, ref:'Neighborhood' ,required:true},
        shopUnit: { type:mongoose.Schema.Types.ObjectId, ref:'ShopUnit' ,required:true},
  });

  module.exports=mongoose.model('ShopUnitServiceAddress',shopUnitServiceAddressSchema)