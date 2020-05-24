var db=require('../db');
var express=require('express');
module.exports.checkLogin=function(req,res,next){
    if(!req.signedCookies.userid){
        res.redirect('/auth/login');
        return;
    }
    var user=db.get('user').find({id:req.signedCookies.userid}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    //console.log(user);
    res.locals.usr=user;
    //console.log(res.locals.user);
    
    next();
}

