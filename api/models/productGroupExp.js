const mongoose = require('mongoose');

  const productGroupExpSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name:{type:String,required:true},
        description:{type:String,required:true},
        groupType: {type:Number, default: 1}
  });

  module.exports=mongoose.model('ProductGroupExp',productGroupExpSchema)