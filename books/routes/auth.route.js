const express= require('express');
var route=express.Router();

var controller=require('../controller/auth.controller');
 
route.get('/login',controller.login);
route.post('/login',controller.postLogin);
route.get('/signup',controller.signUp);
route.post('/signup',controller.postSignup);
module.exports=route;