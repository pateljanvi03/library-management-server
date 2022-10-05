const mongoose = require("mongoose");

const BookItem = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
    },
    shelf: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookItem", BookItem);
