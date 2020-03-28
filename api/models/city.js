const mongoose = require('mongoose');

  const citySchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        code: {type:Number, required:true},
        name: {type:String, required: true}
  });

  module.exports=mongoose.model('City',citySchema)