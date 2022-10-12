const express = require("express");
const validate = require("express-validation");
const {
  list,
  create,
  get,
  update,
  remove,
  load,
} = require("../../controllers/bookItem.controller");
const { LOGGED_USER } = require("../../middlewares/auth");
const { createBookItem } = require("../../validations/bookItem.validation");

const router = express.Router();

router.use(LOGGED_USER);

router.param("bookItemId", load);

router.route("/").get(list).post(validate(createBookItem), create);

router
  .route("/:bookItemId")
  .get(get)
  .put(update) // @todo - add validation
  .delete(remove);

module.exports = router;
