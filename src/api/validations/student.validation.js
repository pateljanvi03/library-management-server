const Joi = require("joi");

module.exports = {
  createStudent: {
    name: Joi.string().required(),
    branchId: Joi.string().required(),
    enrollmentNumber: Joi.number().required(),
    phone: Joi.string(),
    email: Joi.string(),
    isActive: Joi.boolean(),
    batch: Joi.number(),
    address: Joi.string(),
  },
};
