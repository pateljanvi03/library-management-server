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
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
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
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

BorrowedBooks.virtual("bookItem", {
  ref: "BookItem",
  localField: "bookItemId",
  foreignField: "_id",
  justOne: true,
});

BorrowedBooks.virtual("student", {
  ref: "Student",
  localField: "studentId",
  foreignField: "_id",
  justOne: true,
});

BorrowedBooks.virtual("issuerUser", {
  ref: "User",
  localField: "issuerUserId",
  foreignField: "_id",
  justOne: true,
});

BorrowedBooks.virtual("collecterUser", {
  ref: "User",
  localField: "collecterUserId",
  foreignField: "_id",
  justOne: true,
});

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
