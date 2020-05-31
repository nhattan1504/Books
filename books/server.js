const express = require("express");
const app = express();
//const shortid = require('shortid');
const bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

//var db=require('./db');
var authMiddle=require('./validates/auth.middleware')
var booksRoute=require('./routes/books.route');
var usersRoute=require('./routes/users.route');
var transactionRoute=require('./routes/transaction.route');
var authRoute=require('./routes/auth.route');
var profileRoute=require('./routes/profile.route');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engines', 'pug');
app.use(express.static('public'));
app.use(cookieParser("dsvahndsadbhsadsadjnma"));
var port = 3000;
// our default array of dreams

app.get('/',(req,res,next)=>{
    //res.cookie('user-id',12345);
    //console.log(res.cookie.domain);
    //console.log(req.cookies);
    res.render('layout.pug');
})

app.use('/profile',authMiddle.checkLogin,profileRoute);
app.use('/auth',authRoute);
app.use('/books',booksRoute);
app.use('/users',authMiddle.checkLogin,usersRoute);
app.use('/transaction',authMiddle.checkLogin,transactionRoute);




app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
