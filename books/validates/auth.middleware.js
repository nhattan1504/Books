var db=require('../db');

module.exports.checkLogin=function(req,res,next){
    if(!req.cookies){
        res.redirect('/auth/login');
    }
    var user=db.get('user').find({id:req.cookies.userid}).value();
    if(!user){
        res.redirect('/auth/login');
    }
    console.log(user);
    
    res.locals.user=user;
    next();
}

