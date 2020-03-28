const mongoose = require('mongoose');

  const userTypeSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{type:String,required:true},
        type: {type:Number,required:true}, //user:0 admin:1 market:2
  });

  module.exports=mongoose.model('UserType',userTypeSchema)