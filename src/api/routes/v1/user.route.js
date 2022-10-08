const express = require("express");
const validate = require("express-validation");
const controller = require("../../controllers/user.controller");
const { authorize, ADMIN, LOGGED_USER } = require("../../middlewares/auth");
const { createUser, updateUser } = require("../../validations/user.validation");

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param("userId", controller.load);

router
  .route("/")
  .get(controller.list)
  .post(validate(createUser), controller.create);

router
  .route("/:userId")
  .put(validate(updateUser), controller.update)
  .delete(controller.remove);

module.exports = router;
