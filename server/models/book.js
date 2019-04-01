const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: String, required: true },
  picture: { type: String },
  genre: { type: String, required: true },
  publication: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;
