const mongoose = require('mongoose');

  const orderSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        shopUnit:{type:mongoose.Schema.Types.ObjectId, ref:'ShopUnit' ,required:true},
        guid: {type:String, required:true},
        user:{type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
        total_amount: {type:Number, required:true},
        address: { type:mongoose.Schema.Types.ObjectId, ref:'Address' ,required:true},
        payment_type: {type:Number, required:true},
        order_status: {type:Number, required:true},
        order_active: {type:Number, required:true}
  });

  module.exports=mongoose.model('Order',orderSchema)