const express=require('express');
var route=express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

var profileController=require('../controller/profile.controller');

route.get('',profileController.index);

route.post('/updated',upload.single('avatar'),profileController.updatePost);
module.exports= route;