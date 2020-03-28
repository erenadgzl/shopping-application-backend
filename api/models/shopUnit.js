const mongoose = require('mongoose');

  const shopUnitSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: { type:String, required:true },
        shop: { type:mongoose.Schema.Types.ObjectId, ref:'Shop' ,required:true},
        address: { type:mongoose.Schema.Types.ObjectId, ref:'Address' ,required:true},
        min_order: {type:Number, required: true},
        phone: { type:String, required: true},
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        description: { type:String },
        status: { type: Boolean, default:false }
  });

  module.exports=mongoose.model('ShopUnit',shopUnitSchema)