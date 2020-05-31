var mongoose=require('mongoose');

var userSchema= new mongoose.Schema({
    name: String,
    favorite: String,
    avatarUrl: String,
    email:String,
    password: String,
    isAdmin: Boolean,
    wrongLoginCount: Number
});

var user=mongoose.model('user',userSchema,'user');

module.exports =user;