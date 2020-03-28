const mongoose = require('mongoose');

  const shopUnitStockMovementSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        shopUnit: { type:mongoose.Schema.Types.ObjectId, ref:'ShopUnit' ,required:true},
        product: { type:mongoose.Schema.Types.ObjectId, ref:'Product' ,required:true},
        quantity: {type:Number, required: true},
        movement_type: {type:Number, required: true} //0 OUT 1 İN 
  });

  module.exports=mongoose.model('ShopUnitStockMovement',shopUnitStockMovementSchema)