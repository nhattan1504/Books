var db=require('../db');
var express=require('express');
var users=require('../model/user.model');
module.exports.checkLogin=function(req,res,next){
    if(!req.signedCookies.userid){
        res.redirect('/auth/login');
        return;
    }
    var user=users.findById({_id:req.signedCookies.userid});
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    //console.log(user);
    res.locals.usr=user;
    //console.log(res.locals.user);
    next();
}

