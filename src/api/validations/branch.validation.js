const Joi = require("joi");

module.exports = {
  // POST /v1/branches
  createBranch: {
    body: {
      title: Joi.string().max(128),
    },
  },
};
