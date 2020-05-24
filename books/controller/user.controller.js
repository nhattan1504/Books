var db= require('../db');
const shortid = require('shortid');


module.exports.index=function(req,res){
    res.render('./users/user.pug',{
        user:db.get('user').value()
    });
};

module.exports.create=function(req,res){
    res.render('./users/createuser.pug');
};

module.exports.createPost=function(req,res){
    req.body.id=shortid.generate();
    //db.get('user').push(req.body).write();
    res.redirect('/users');
};

module.exports.delete=function(req,res){
    var id= req.params.id;
    db.get('user').remove({id:id}).write();
    res.redirect('/users');
};

module.exports.get=function(req,res){
    var id= req.params.id;
    var iduser=db.get('user').find({id:id}).write();
    res.render('./users/favoriteuser.pug',{
        user:iduser
    });
};

module.exports.updated=function(req,res){
    var id= req.params.id;
    var iduser=db.get('user').find({id:id}).write();
    res.render('./users/changeuser.pug',{
        user:iduser
    });
}

module.exports.updatedPost=function(req,res){
    var id=req.params.id;
    db.get('user')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/users')
}