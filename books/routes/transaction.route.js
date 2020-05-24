var express= require('express');
var route=express.Router();

var controller=require('../controller/transaction.controller')
route.get('',controller.index);

route.get('/create',controller.create);

route.post('/create',controller.createPost);

route.get('/:id/completed',controller.completePost);
module.exports=route;