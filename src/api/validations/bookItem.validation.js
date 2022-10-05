const Joi = require("joi");

module.exports = {
  createBookItem: {
    bookId: Joi.string().required(),
    status: Joi.string(),
    shelf: Joi.string(),
  },
};
