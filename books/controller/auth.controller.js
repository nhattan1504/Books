// var express=require('express');
var db = require("../db");
// var md5 = require("md5");
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
  var user = db.get("user").find({ email: mail }).value();
  if (!user) {
    // check email login is exist
    res.render("./auth/login.pug", {
      error: ["Email dont exist"],
      values: req.body,
    });
    return;
  }

  var now = new Date();
  var acc = db.get("accountBlock").find({ user: user.name }).value();
  //check user was block
  if (acc) {
    if (now.getTime() - acc.blockAt < 3000) {
      res.render("./auth/login.pug", { error: ["account is block"] });
    } else if (now.getTime() - acc.blockAt >= 3000) {
      db.get("accountBlock").remove({ user: user.name }).value();
      db.get("user")
        .find({ name: user.name })
        .assign({ wrongLoginCount: 0 })
        .write();
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
      await db.get("user")
        .find({ name: user.name })
        .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
        .write();
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
        db.get("accountBlock")
          .push({ user: user.name, blockAt: time.getTime() })
          .write();
      }
      res.render("./auth/login.pug", {
        error: ["Password is wrong"],
        values: req.body,
      });
      return;
    }
  }
  res.cookie("userid", user.id, {
    signed: true,
  });
  res.redirect("/users");
};