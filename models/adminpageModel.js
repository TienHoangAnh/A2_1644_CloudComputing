var mongoose = require('mongoose');

var adminpageSchema = mongoose.Schema({
   name: String,
   type: String,
   price: Number,
   size: Number,
   status: String,
   quantity: Number,
   image: String,
   image1: String
});

var ironmanModel = mongoose.model('IronMan', adminpageSchema, 'ironman');
var transformersModel = mongoose.model('Transformers', adminpageSchema, 'transformers');

module.exports = {
   ironmanModel: ironmanModel,
   transformersModel: transformersModel
};