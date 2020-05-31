var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    userId: String,
    bookId: String,
    isCompleted: Boolean
});

var transaction = mongoose.model('transaction', transactionSchema, 'transaction');

module.exports = transaction;