const express= require('express');
var route=express.Router();

var controller=require('../controller/user.controller');
var countCookie=require('../validates/cookie.middleware');
var validate=require('../validates/user.middleware');

route.get('',controller.index);

// route.get('/cookie',function(req,res,next){
//     res.cookie('user-id',12345);
// })

route.get('/create',countCookie.count,controller.create);

route.post('/create',validate.validateCreate,controller.createPost);

route.get('/:id/delete',controller.delete);

route.get('/:id',countCookie.count,controller.get);

route.get('/:id/updated',controller.updated);

route.post('/:id/updated',controller.updatedPost);

module.exports=route;












