var mongoose = require('mongoose')
var adminpageSchema = mongoose.Schema(
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
var adminpageModel = mongoose.model('adminpage', adminpageSchema, 'adminpage')
module.exports = adminpageModel;