const mongoose = require("mongoose");

const BorrowedBooks = new mongoose.Schema(
  {
    bookItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookItem",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    issueDate: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    returnDate: {
      type: String,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
    },
    issuerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    collecterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fineAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

BorrowedBooks.statics = {
  list(filterQuery) {
    const options = {};
    if (filterQuery.studentId) {
      options.studentId = filterQuery.studentId;
    }
    if (filterQuery.status) {
      options.status = filterQuery.status;
    }

    const page = parseInt(filterQuery.page) || 1;
    const limit = parseInt(filterQuery.limit) || 5;

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  },
};

module.exports = mongoose.model("BorrowedBooks", BorrowedBooks);
