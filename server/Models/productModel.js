const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    price: Number,
    image: String,
    description: String
})

const booksModel = mongoose.model('book', bookSchema);

module.exports = booksModel
