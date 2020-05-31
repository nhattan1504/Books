var db = require('../db');
var user=require('../model/user.model');
var transaction=require('../model/transaction.model');
var book=require('../model/book.model');
//app.set('view engines', 'pug');
var shortid = require('shortid');

module.exports.index = async function (req, res) {
    var admin= await user.findOne({_id:req.signedCookies.userid});
    var idUser;
    //var idBook = db.get('transaction').map('bookId').value();
    var idBook = await transaction.find();
    var listIdBook=idBook.map(function(x){
        return x.bookId;
    })
    console.log(listIdBook);
    console.log(admin);
    if(admin.isAdmin){
        idUser= await transaction.find()
        idUser.map(x=> x.userId);
        //idUser = db.get('transaction').map('userId').value();
    }else{
        idUser = await transaction.find({userId:admin._id});
        //idUser = db.get('transaction').filter({userId:admin.id}).value();
    }
    console.log(idUser);
    var listBook = [];
    for (var i of idBook) {
        let aBook= await book.find({_id:i});
        listBook.push(aBook.title);
        // listBook.push((db.get('book').find({ id: i }).value()).title);
    }
    
    console.log(listBook);
    var listUser = [];
    
    if(admin.isAdmin==true){
        for (let i of idUser) {
            let aUser= await user.find({_id:i});            
            listUser.push(aUser.name);
            // listUser.push(db.get('user').find({ id:i }).value().name);
        }
    }
    else{
        //console.log(idUser);
        
        for ( var i of idUser){
            //console.log(db.get('user').find({id:i.userId}).value());
            let anUser=user.find({_id:i});
            listUser.push(anUser.name);
            //listUser.push(db.get('user').find({id:i.userId}).value().name);
        }
    }
    //console.log(listUser);
    
    // console.log(db.get('transaction').map('id').value());
    res.render('./transaction/transaction.pug', {
        user: listUser,
        book: listBook,
        transaction: await transaction.find() 
        //db.get('transaction').map('id').value()
    });
};

module.exports.create = function (req, res) {
    res.render('./transaction/createTransaction.pug', {
        user:user.find(),
         //db.get('user').value(), 
        book: book.find() 
        //db.get('book').value()
    });
};

module.exports.createPost = function (req, res) {
    req.body.id = shortid.generate();
    var userId = (db.get('user').find({ name: req.body.name }).value()).id;
    var userBook = (db.get('book').find({ title: req.body.title }).value()).id;
    db.get('transaction').push({ userId: userId, bookId: userBook, id: req.body.id, isCompleted: false }).write();
    res.redirect('/transaction');
};

module.exports.completePost = function (req, res) {
    var id = req.params.id;
    var errors = [];
    if (db.get('transaction').find({ id: id }).value()) {
        //errors.push('Dont find this transaction');
        db.get('transaction').remove({ id: id }).write();
    }
    else {
        errors.push('Dont find this transaction');
    }
    if (errors) {
        res.send(errors);
    }
    res.redirect('/transaction');
}