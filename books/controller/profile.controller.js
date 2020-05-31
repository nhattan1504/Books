var db=require('../db');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
module.exports.index=function(req,res){
    var value=db.get('user').find({id:req.signedCookies.userid}).value();
    //console.log(value);
    res.render('./profile/profileuser.pug',{
        value:value
    });
}

module.exports.update=function(req,res){
    var value=db.get('user').find({id:req.signedCookies.userid}).value();
    //console.log(value);
    res.render('./profile/profileuser.pug',{
        value:value
    });
}

module.exports.updatePost=function(req,res){

}