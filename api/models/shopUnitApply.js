const mongoose = require('mongoose');

  const shopUnitApplySchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        shopName: {type:String, required: true},
        shopUser: { type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
        shopDescription: { type:String },
        shopUnitName: { type:String, required:true },
        shopUnitAddress: { type:mongoose.Schema.Types.ObjectId, ref:'Address' ,required:true},
        shopUnitMin_order: {type:Number, required: true},
        shopUnitPhone: { type:String, required: true},
        shopUnitEmail: { 
            type: String, 
            required: true, 
            unique: true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        shopUnitDescription: { type:String },
        status: { type: Boolean, default:false }
  });

  module.exports=mongoose.model('ShopUnitApply',shopUnitApplySchema)