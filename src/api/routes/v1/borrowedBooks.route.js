const express = require("express");
const validate = require("express-validation");
const { create, update } = require("../../controllers/borrowedBook.controller");
const {
  createBorrowedBook,
  updateBorrowedBook,
} = require("../../validations/borrowedBooks.validation");

const router = express.Router();

router
  .route("/")
  .post(validate(createBorrowedBook), create)
  .put(validate(updateBorrowedBook), update);

module.exports = router;
