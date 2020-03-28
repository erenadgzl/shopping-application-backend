const mongoose = require('mongoose');

  const categorySchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        node_id: {type:String, required:true},
        name: {type:String,required: true},
        sequence: {type:Number, default:1},
        status:{type:Boolean,default:true},

  });

  module.exports=mongoose.model('Category',categorySchema)