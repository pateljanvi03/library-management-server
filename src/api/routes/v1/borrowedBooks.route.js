const express = require("express");
const validate = require("express-validation");
const {
  create,
  update,
  list,
} = require("../../controllers/borrowedBook.controller");
const { LOGGED_USER } = require("../../middlewares/auth");
const {
  createBorrowedBook,
  updateBorrowedBook,
} = require("../../validations/borrowedBooks.validation");

const router = express.Router();

router.use(LOGGED_USER);

router
  .route("/")
  .get(list)
  .post(validate(createBorrowedBook), create)
  .put(validate(updateBorrowedBook), update);

module.exports = router;
