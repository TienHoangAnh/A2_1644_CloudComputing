var mongoose = require('mongoose')
var userSchema = mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        username : {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        },
        confirmPassword : {
            type: String,
            required: true
        },
    }
)

var userModel = mongoose.model('user', userSchema, 'user')
// note: tham số thứ 3 là tên của connection (ex: user)
module.exports = userModel;