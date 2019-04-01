const Joi = require('joi');

const bookSchema = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string(),
  author: Joi.string(),
  pages: Joi.number(),
  price: Joi.string(),
  picture: Joi.string(),
  genre: Joi.string(),
  publication: Joi.string(),
  publishedDate: Joi.date(),
  description: Joi.string(),
});

module.exports = {
  '/api/books': bookSchema,
};
