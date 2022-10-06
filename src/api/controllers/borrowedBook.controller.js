const BorrowedBook = require("../models/borrowedBooks.model");
const dayjs = require("dayjs");

const borrowedBookStatus = {
  BORROWED: "borrowed",
  RETURNED: "returned",
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    body.dueDate = dayjs().add(5, "day");
    body.issueDate = dayjs();
    body.status = borrowedBookStatus.BORROWED;

    // @todo - add userId when implement auth middleware

    const borrowedBook = await BorrowedBook.create(body);
    return res.json({ borrowedBook });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const borrowedBook = await BorrowedBook.findOne({
      status: borrowedBookStatus.BORROWED,
      studentId: req.body.studentId,
      bookItemId: req.body.bookItemId,
    });
    borrowedBook.status = borrowedBookStatus.RETURNED;
    borrowedBook.returnDate = dayjs();
    await borrowedBook.save();

    // @todo - add userId when implement auth middleware
    // @todo - add logic to calculate fine

    return res.json({ borrowedBook });
  } catch (error) {
    return next(error);
  }
};
