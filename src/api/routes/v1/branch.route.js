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
const { createBranch } = require("../../validations/branch.validation");

const router = express.Router();

router.param("branchId", load);

router.route("/").get(list).post(validate(createBranch), create);

router.route("/:branchId").get(get).put(update).delete(remove);

module.exports = router;
