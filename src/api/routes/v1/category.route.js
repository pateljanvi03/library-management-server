const express = require("express");
const validate = require("express-validation");
const {
  list,
  create,
  get,
  update,
  remove,
  load,
} = require("../../controllers/category.controller");
const { createCategory } = require("../../validations/category.validation");

const router = express.Router();

router.param("categoryId", load);

router.route("/").get(list).post(validate(createCategory), create);

router
  .route("/:categoryId")
  .get(get)
  .put(validate(createCategory), update)
  .delete(remove);

module.exports = router;
