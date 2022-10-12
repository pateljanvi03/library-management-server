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
const { LOGGED_USER } = require("../../middlewares/auth");
const { createCategory } = require("../../validations/category.validation");

const router = express.Router();

router.use(LOGGED_USER);

router.param("categoryId", load);

router.route("/").get(list).post(validate(createCategory), create);

router
  .route("/:categoryId")
  .get(get)
  .put(update) // @todo - add validation
  .delete(remove);

module.exports = router;
