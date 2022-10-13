const BorrowedBook = require("../models/borrowedBooks.model");
const BookItem = require("../models/bookItem.model");
const dayjs = require("dayjs");

const borrowedBookStatus = {
  BORROWED: "borrowed",
  RETURNED: "returned",
};

exports.list = async (req, res, next) => {
  try {
    let borrowedBooks = await BorrowedBook.list(req.query)
      .populate({
        path: "bookItem",
        populate: {
          path: "book",
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

    borrowedBooks = borrowedBooks.map((borrowedBook) => {
      let data = borrowedBook.toJSON();
      if (data.bookItem) {
        data.bookItem = borrowedBook.bookItem.toJSON();

        if (borrowedBook.bookItem.book) {
          data.bookItem.book = borrowedBook.bookItem.book.toJSON();
        }
      }

      return data;
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

exports.getGroupedData = async (req, res, next) => {
  try {
    const match = getTimeRangeQuery();

    const result = await BorrowedBook.aggregate([
      match,
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    let startDate = dayjs().subtract(1, "week").add(1, "day");
    let graphData = [];
    for (let index = 0; index < 7; index++) {
      let indexDate = result.findIndex(
        (x) => x._id == startDate.format("DD-MM-YYYY")
      );
      if (indexDate == -1) {
        graphData.push({ _id: startDate.format("DD-MM-YYYY"), total: 0 });
      } else {
        graphData.push(result[indexDate]);
      }
      startDate = startDate.add(1, "day");
    }

    return res.json({ result: graphData });
  } catch (error) {
    return next(error);
  }
};

function getTimeRangeQuery() {
  let endDate = dayjs().add(1, "day");
  let startDate = dayjs().subtract(1, "week");

  return {
    $match: {
      createdAt: {
        $gte: startDate.toDate(),
        $lt: endDate.toDate(),
      },
    },
  };
}
