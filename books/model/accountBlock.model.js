var mongoose = require('mongoose');

var accountBlockSchema = new mongoose.Schema({
    user: String,
    blockAt: Number
});

var accountBlock = mongoose.model('accountBlock', accountBlockSchema, 'accountBlock');

module.exports = accountBlock;