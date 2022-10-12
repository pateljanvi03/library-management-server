const express = require("express");
const validate = require("express-validation");
const {
  list,
  create,
  get,
  update,
  remove,
  load,
} = require("../../controllers/branch.controller");
const { LOGGED_USER } = require("../../middlewares/auth");
const { createBranch } = require("../../validations/branch.validation");

const router = express.Router();

router.use(LOGGED_USER);

router.param("branchId", load);

router.route("/").get(list).post(validate(createBranch), create);

router
  .route("/:branchId")
  .get(get)
  .put(update) // @todo - add validation
  .delete(remove);

module.exports = router;
