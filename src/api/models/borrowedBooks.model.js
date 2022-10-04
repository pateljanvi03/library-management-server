const mongoose = require('mongoose');

const BorrowedBooks = new mongoose.Schema(
  {
    bookItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookItem"
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },
    issueDate: {
      type: String
    },
    dueDate: {
      type: String
    },
    returnDate: {
      type: String
    },
    status: {
      type: String,
      enum: [ 'borrowed', "returned"]
    },
    issuerUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    collecterUserId: {
      typoe: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    fineAmount: {
      type: Number
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('BorrowedBooks', BorrowedBooks);
