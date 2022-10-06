const Joi = require("joi");

module.exports = {
  createBorrowedBook: {
    bookItemId: Joi.string().required(),
    studentId: Joi.string().required(),
  },
  updateBorrowedBook: {
    bookItemId: Joi.string().required(),
    studentId: Joi.string().required(),
  },
};
