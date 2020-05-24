var db = require('../db');

//app.set('view engines', 'pug');
var shortid = require('shortid');

module.exports.index = function (req, res) {
    var admin=db.get('user').find({id:req.cookies.userid}).value();
    //console.log(id);
    var idUser;
    var idBook = db.get('transaction').map('bookId').value();
    if(admin.isAdmin){
        idUser = db.get('transaction').map('userId').value();
    }else{
        idUser = db.get('transaction').filter({userId:admin.id}).value();
    }
    console.log(idUser);
    var listBook = [];
    for (var i of idBook) {
        listBook.push((db.get('book').find({ id: i }).value()).title);
    }
    
    //console.log(listBook);
    var listUser = [];
    
    if(admin.isAdmin==true){
        for (let i of idUser) {
            listUser.push(db.get('user').find({ id:i }).value().name);
        }
    }
    else{
        //console.log(idUser);
        
        for ( var i of idUser){
            console.log(db.get('user').find({id:i.userId}).value());
            listUser.push(db.get('user').find({id:i.userId}).value().name);
        }
    }
    // console.log(db.get('transaction').map('id').value());
    res.render('./transaction/transaction.pug', {
        user: listUser,
        book: listBook,
        transaction: db.get('transaction').map('id').value()
    });
};

module.exports.create = function (req, res) {
    res.render('./transaction/createTransaction.pug', {
        user: db.get('user').value(), book: db.get('book').value()
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