// var express=require('express');
var db = require("../db");
var shortid=require('shortid');
// var md5 = require("md5");
var book=require('../model/book.model');
var users=require('../model/user.model');
var accountBlock=require('../model/accountBlock.model');
var bcrypt = require("bcrypt");
var sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports.login = function (req, res) {
  res.render("./auth/login.pug");
};
module.exports.postLogin = async function (req, res) {
  //console.log(req.body.email);
  var mail = req.body.email;
  var user = await users.findOne({ email: mail });
  
  if (!user) {
    // check email login is exist
    res.render("./auth/login.pug", {
      error: ["Email dont exist"],
      values: req.body,
    });
    return;
  }

  var now = new Date();
  var acc = await accountBlock.findOne({user:user.name});
  
  //db.get("accountBlock").find({ user: user.name }).value();
  //check user was block
  if (acc !== null) {
    if (now.getTime() - acc.blockAt < 3000) {
      res.render("./auth/login.pug", { error: ["account is block"] });
    } else if (now.getTime() - acc.blockAt >= 3000) {
      accountBlock.deleteOne({user:user.name});
      //db.get("accountBlock").remove({ user: user.name }).value();
      user.findOneAndUpdate({name:user.name},{wrongLoginCount:0});
      // db.get("user")
      //   .find({ name: user.name })
      //   .assign({ wrongLoginCount: 0 })
      //   .write();
    }
  }

  // console.log(user);
  var hash = await bcrypt.hash(req.body.password, 10);
  var isCorrectPassword = await bcrypt.compare(user.password, hash);
  //console.log(isCorrectPassword);
  if (user.wrongLoginCount > 4) {
    res.render("./auth/login.pug", { error: ["account is block"] });
  } else {
    if (!isCorrectPassword) {
      await users.findOneAndUpdate({name:user.name},{wrongLoginCount:user.wrongLoginCount+1});
      // await db.get("user")
      //   .find({ name: user.name })
      //   .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
      //   .write();
      if (user.wrongLoginCount == 3) {
        const msg = {
          to: 'nhattan1585@gmail.com',
          from: 'nhattan1585@gmail.com',
          subject: 'Account was block',
          text: 'account is block because you wrong password than 3 time ',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg, function (err) {
          if (err) {
            console.error("cant send email");
            console.log(err);
          }
        });
      }
      if (user.wrongLoginCount == 4) {
        var time = new Date();
        accountBlock.insertMany([{ user: user.name, blockAt: time.getTime() }]);
        // db.get("accountBlock")
        //   .push({ user: user.name, blockAt: time.getTime() })
        //   .write();
      }
      res.render("./auth/login.pug", {
        error: ["Password is wrong"],
        values: req.body,
      });
      return;
    }
  }
   await res.cookie("userid", user._id, {
    signed: true
  });
  res.redirect("/users");
};

module.exports.signUp=function(req,res){
  res.render('./auth/signup.pug');
};

module.exports.postSignup= async function(req,res){
  req.body.isAdmin=false;
  req.body.avatarUrl="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png";
  req.body.wrongLoginCount=0;
  // console.log(req.body);
  await users.insertMany([req.body]);
  res.redirect('/auth/login');
};