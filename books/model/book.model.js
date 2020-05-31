var mongoose=require('mongoose');

var bookSchema= new mongoose.Schema({
    title: String,
    description: String,
    image: String
});

var book=mongoose.model('book',bookSchema,'book');

module.exports =book;