const express = require("express");
const validate = require("express-validation");
const {
  list,
  create,
  get,
  update,
  remove,
  load,
} = require("../../controllers/student.controller");
const { LOGGED_USER } = require("../../middlewares/auth");
const { createStudent } = require("../../validations/student.validation");

const router = express.Router();

router.use(LOGGED_USER);

router.param("studentId", load);

router.route("/").get(list).post(validate(createStudent), create);

router
  .route("/:studentId")
  .get(get)
  .put(update) // @todo - add validation
  .delete(remove);

module.exports = router;
