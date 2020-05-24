// var express=require('express');
var db= require('../db');
 var md5=require('md5')

module.exports.login=function(req,res){
    res.render('./auth/login.pug');
}
module.exports.postLogin=function(req,res){
    //console.log(req.body.email);
    var mail=req.body.email;
    console.log(mail);
    var user=db.get('user').find({email:mail}).value();
    console.log(user);
    if(!user){
        res.render('./auth/login.pug',{
            error:['Email dont exist'],values:req.body
        })
        return;
    }
    var hashPassword=md5(req.body.password);
    if(user.password!==hashPassword){
        res.render('./auth/login.pug',{
            error:["Wrong password"],values:req.body
        })
        return;
    }
    
    res.cookie('userid',user.id);
    res.redirect('/users');
    
        
}