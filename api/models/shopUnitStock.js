const mongoose = require('mongoose');

  const shopUnitStockSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        shopUnit: { type:mongoose.Schema.Types.ObjectId, ref:'ShopUnit' ,required:true},
        product: { type:mongoose.Schema.Types.ObjectId, ref:'Product' ,required:true},
        stock: {type:Number, required: true},
        price: {type:Number,required: true},
        discount:{type:Boolean,default:false},
        discount_rate: {type:Number,default:0},
        campaign:{type:Boolean,default:false},
  });

  module.exports=mongoose.model('ShopUnitStock',shopUnitStockSchema)