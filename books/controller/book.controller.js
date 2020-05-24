var db= require('../db');
const shortid = require('shortid');

module.exports.index=function(req,res){
    res.render('./books/books.pug', {
        book: db.get('book').value()
    });
};

module.exports.create=function(req,res){
    res.render('./books/create.pug');
};

module.exports.createPost=function(req,res){
    req.body.id = shortid.generate();
    console.log(req.body);
    db.get('book').push(req.body).write();
    res.redirect('/books');
};

module.exports.get=function(req,res){
    var id = req.params.id;
    var idbook = db.get('book').find({ id: id }).write();
    res.render('./books/desciption.pug', {
        book: idbook
    });
};

module.exports.delete=function(req,res){
    var id = req.params.id;
    db.get('book')
        .remove({ id: id })
        .write();
    res.redirect('/books');
};

module.exports.updated=function(req,res){
    var id=req.params.id;
    var Idbook=db.get('book').find({id:id}).value();
    console.log(Idbook);
    res.render('./books/change.pug',{
        book:Idbook
    });
};

module.exports.updatedPost=function(req,res){
    var id=req.params.id;
    console.log(id);
    
    db.get('book')
        .find({ id:id })
        .assign(req.body)
        .write()
    res.redirect('/books');
};