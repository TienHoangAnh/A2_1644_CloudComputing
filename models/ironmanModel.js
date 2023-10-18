var mongoose = require('mongoose')
var ironmanSchema = mongoose.Schema(
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
var ironmanModel = mongoose.model('ironman', ironmanSchema, 'ironman')
module.exports = ironmanModel;