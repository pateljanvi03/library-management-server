const { number } = require("joi");
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
      ref: "Book",
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

module.exports = mongoose.model("Book", Book);
