const mongoose = require('mongoose');

  const neighborhoodSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        district:{type:mongoose.Schema.Types.ObjectId, ref:'District' ,required:true},
        name: {type:String, required: true}
  });

  module.exports=mongoose.model('Neighborhood',neighborhoodSchema)