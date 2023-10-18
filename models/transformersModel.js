var mongoose = require('mongoose')
var transformersSchema = mongoose.Schema(
   {
      name : String,
      type : String,
      price : Number,
      size : Number,
      status : String,
      quantity : Number, 
      image : String,
      image1 : String
   }
)
var transformersModel = mongoose.model('transformers', transformersSchema, 'transformers')
module.exports = transformersModel;