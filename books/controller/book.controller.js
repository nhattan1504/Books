
var book= require('../model/book.model')
module.exports.index= async function(req,res){
    // var page=parseInt(req.query.page) ||1;
    // var perPage=8;
    // var start= perPage*(page-1);
    // var end=perPage* page;
    var books= await book.find();
    res.render('./books/books.pug', {
        book: books
    });
};

module.exports.create=function(req,res){
    res.render('./books/create.pug');
};

module.exports.createPost= async function(req,res){
    //console.log(req.body);
    req.body.image="https://loremflickr.com/320/240";
    await book.insertMany([{title:req.body.title,description:req.body.description,image:req.body.image}]);
    res.redirect('/books');
};

module.exports.get= async function(req,res){
    var id = req.params.id;
    var idbook = await book.findById({_id:id});
    res.render('./books/desciption.pug', {
        book: idbook
    });
};

module.exports.delete=function(req,res){
    var id = req.params.id;
    book.deleteOne({_id:id}).then(function(success){
        console.log("success");
    })
    res.redirect('/books');
};

module.exports.updated= async function(req,res){
    var id = req.params.id;
    var idbook = await book.findById({_id:id});
    res.render('./books/change.pug', {
        book: idbook
    });
};

module.exports.updatedPost= async function(req,res){
    var id=req.params.id;
    await book.findByIdAndUpdate({_id:id},req.body);
    res.redirect('/books');
};