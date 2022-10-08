const BookItem = require("../models/bookItem.model");
const Book = require("../models/book.model");

exports.load = async (req, res, next, id) => {
  try {
    const bookItem = await BookItem.findById(id);
    if (!bookItem) {
      return next(new Error("invalid id"));
    }
    req.bookItem = bookItem;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res, next) => {
  try {
    return res.json({ bookItem: req.bookItem });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const bookItems = await BookItem.find();
    return res.json({ bookItems });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const bookItem = await BookItem.create(req.body);
    await Book.findOneAndUpdate(
      { _id: req.body.bookId },
      { $inc: { quantity: 1 } }
    );
    return res.json({ bookItem });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await req.bookItem.updateOne(req.body);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.bookItem.delete();
    await Book.findOneAndUpdate(
      { _id: req.bookItem.bookId },
      { $inc: { quantity: -1 } }
    );
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
