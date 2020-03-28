const mongoose = require('mongoose');

  const districtSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        code: {type:Number, required:true},
        name: {type:String, required: true}
  });

  module.exports=mongoose.model('District',districtSchema)