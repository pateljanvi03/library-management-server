const Joi = require("joi");

module.exports = {
  // POST /v1/branches
  createBook: {
    body: {
      title: Joi.string().max(128).required(),
      ISBN: Joi.string().required(),
      image: Joi.string(),
      categoryId: Joi.string().required(),
      author: Joi.string(),
      language: Joi.string(),
      publisher: Joi.string(),
      publicationYear: Joi.number(),
      price: Joi.number(),
      description: Joi.string(),
      quantity: Joi.number(),
    },
  },
};
