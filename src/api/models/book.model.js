const { number, optional } = require("joi");
const mongoose = require("mongoose");

const Book = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    categoryId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    author: {
      type: String,
    },
    language: {
      type: String,
    },
    publisher: {
      type: String,
    },
    publicationYear: {
      type: Number,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

Book.statics = {
  list(filterQuery) {
    const options = {};
    if (filterQuery.name) {
      options.title = { $regex: filterQuery.name };
    }
    if (filterQuery.ISBN) {
      options.ISBN = filterQuery.ISBN;
    }
    if (filterQuery.author) {
      options.author = { $regex: filterQuery.author };
    }

    const page = parseInt(filterQuery.page) || 1;
    const limit = parseInt(filterQuery.limit) || 5;

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  },
};

module.exports = mongoose.model("Book", Book);
