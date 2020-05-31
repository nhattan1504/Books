//var db = require('../db');
var user = require('../model/user.model')
const shortid = require('shortid');


module.exports.index = async function (req, res) {
    var users = await user.find()
    res.render('./users/user.pug', {
        user: users
    });
};


module.exports.create = function (req, res) {
    res.render('./users/createuser.pug');
};

module.exports.createPost = function (req, res) {
    //req.body.id = shortid.generate();
    //console.log(req.body);
    db.get('user').push(req.body).write();
    res.redirect('/users');
};

module.exports.delete = function (req, res) {
    var id = req.params.id;
    user.deleteOne({_id:id}).then(function(success){
        console.log("success");
    })
    res.redirect('/users');
};

module.exports.get = async function (req, res) {
    var id = req.params.id;
    var iduser = await user.findById({_id:id});
    res.render('./users/favoriteuser.pug', {
        user: iduser
    });
};

module.exports.updated = async function (req, res) {
    var id = req.params.id;
    var iduser = await user.findById({_id:id});
    res.render('./users/changeuser.pug', {
        user: iduser
    });
}

module.exports.updatedPost = async function (req, res) {
    var id = req.params.id;
    //console.log(req.body);
    await user.findOneAndUpdate({_id:id},req.body);
    // await user.findByIdAndUpdate(id,{name:req.body}).catch(function(err){
    //     console.log('err');
    // });
    res.redirect('/users');
}