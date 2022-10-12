const express = require("express");
const validate = require("express-validation");
const {
  list,
  create,
  get,
  update,
  remove,
  load,
} = require("../../controllers/book.controller");
const { LOGGED_USER } = require("../../middlewares/auth");
const { createBook } = require("../../validations/book.validation");

const router = express.Router();

router.param("bookId", load);

router.use(LOGGED_USER);

router.route("/").get(list).post(validate(createBook), create);

router
  .route("/:bookId")
  .get(get)
  .put(update) // @todo - add validation
  .delete(remove);

module.exports = router;
