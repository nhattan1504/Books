// var express=require('express');
var db = require("../db");
// var md5 = require("md5");
var bcrypt = require("bcrypt");

module.exports.login = function (req, res) {
  res.render("./auth/login.pug");
};
module.exports.postLogin = async function (req, res) {
  //console.log(req.body.email);
  var mail = req.body.email;
  var user = db.get("user").find({ email: mail }).value();
  if (!user) {
    res.render("./auth/login.pug", {
      error: ["Email dont exist"],
      values: req.body,
    });
    return;
  }
  console.log(user);
  
  
  var hash = await bcrypt.hash(req.body.password, 10);
  // tai vi day la bat dong bo nen ham bcrypt no chua chayj
  // ban hoc async await chua, minh hocj roi
  // gio doan nay minh dung async await nha ok k ban ?
  // ok de minh thu
  //console.log(hash);

  var isCorrectPassword = await bcrypt.compare(user.password, hash);
  //console.log(isCorrectPassword);

  if (user.wrongLoginCount > 4) {
    res.render("./auth/login.pug", { error: ["account is block"] });
  } else {
    if (!isCorrectPassword) {
        db.get('user').find({name:user.name}).assign({wrongLoginCount:user.wrongLoginCount+1}).write();
        if(user.wrongLoginCount==4){
            var time=new Date();
            db.get('accountBlock').push({user:user.name,blockAt:time.getTime()}).write();
        }
        res.render("./auth/login.pug", {
          error: ["Password is wrong"],
          values: req.body,
        });
        return;
      }
  }
  res.cookie("userid", user.id);
  res.redirect("/users");
};
