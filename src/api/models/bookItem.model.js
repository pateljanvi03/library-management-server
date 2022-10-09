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

BookItem.statics = {
  list(filterQuery) {
    const options = {};
    // if (filterQuery.bookId) {
    //   options.bookId = filterQuery.bookId;
    // }
    if (filterQuery.shelf) {
      options.shelf = filterQuery.shelf;
    }
    if (filterQuery.status) {
      options.status = { $regex: filterQuery.status };
    }

    const page = parseInt(filterQuery.page) || 1;
    const limit = parseInt(filterQuery.limit) || 5;

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  },
};

module.exports = mongoose.model("BookItem", BookItem);
