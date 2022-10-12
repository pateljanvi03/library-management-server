const BorrowedBook = require("../models/borrowedBooks.model");
const BookItem = require("../models/bookItem.model");
const dayjs = require("dayjs");

const borrowedBookStatus = {
  BORROWED: "borrowed",
  RETURNED: "returned",
};

exports.list = async (req, res, next) => {
  try {
    const borrowedBooks = await BorrowedBook.list(req.query)
      .populate({
        path: "bookItem",
        populate: {
          path: "bookId",
          select: "title",
        },
      })
      .populate({
        path: "issuerUser",
        select: "name",
      })
      .populate({
        path: "collecterUser",
        select: "name",
      });
    return res.json({ borrowedBooks });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const bookItem = await BookItem.findById(req.body.bookItemId);
    if (!bookItem || bookItem.status === borrowedBookStatus.BORROWED) {
      return next(new Error("invalid bookItemId"));
    }

    bookItem.status = borrowedBookStatus.BORROWED;
    await bookItem.save();

    const body = req.body;
    body.dueDate = dayjs().add(5, "day");
    body.issueDate = dayjs();
    body.status = borrowedBookStatus.BORROWED;
    body.issuerUserId = req.authUserId;

    const borrowedBook = await BorrowedBook.create(body);
    return res.json({ borrowedBook });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const bookItem = await BookItem.findById(req.body.bookItemId);
    if (!bookItem || bookItem.status !== borrowedBookStatus.BORROWED) {
      return next(new Error("invalid bookItemId"));
    }

    const borrowedBook = await BorrowedBook.findOne({
      status: borrowedBookStatus.BORROWED,
      //studentId: req.body.studentId,
      bookItemId: req.body.bookItemId,
    });

    if (!borrowedBook || bookItem.status !== borrowedBookStatus.BORROWED) {
      return next(new Error("invalid book"));
    }

    bookItem.status = borrowedBookStatus.RETURNED;
    await bookItem.save();

    borrowedBook.status = borrowedBookStatus.RETURNED;
    borrowedBook.returnDate = dayjs();
    borrowedBook.collecterUserId = req.authUserId;
    await borrowedBook.save();

    // @todo - add logic to calculate fine

    return res.json({ borrowedBook });
  } catch (error) {
    return next(error);
  }
};
