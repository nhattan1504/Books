const express = require("express");
const app = express();
//const shortid = require('shortid');
//const bodyParser = require('body-parser');

var cookieParser=require('cookie-parser');

var count=0;
module.exports.count=function(req,res,next){
    if(req.cookies){
        console.log(req.cookies);
        count+=1;
        console.log(req.cookies['user-id']+':'+count);
    };
    next();
}
