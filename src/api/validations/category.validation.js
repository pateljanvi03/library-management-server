const Joi = require("joi");

module.exports = {
  // POST /v1/categories
  createCategory: {
    body: {
      title: Joi.string().max(128).required(),
    },
  },
};
