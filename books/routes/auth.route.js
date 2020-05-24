const express= require('express');
var route=express.Router();

var controller=require('../controller/auth.controller');
 
route.get('/login',controller.login);
route.post('/login',controller.postLogin);
module.exports=route;