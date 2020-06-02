const express= require('express');
var router= express.Router();
var controller=require('../controller/book.controller');

router.get('',controller.index);

router.get('/create',controller.create);
router.post('/create', controller.createPost);


router.get('/:id',controller.get);

router.get('/:id/delete',controller.delete);

router.get('/:id/updated',controller.updated);

router.post('/:id/updated',controller.updatedPost);



module.exports= router;