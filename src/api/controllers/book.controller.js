const Book = require("../models/book.model");

exports.load = async (req, res, next, id) => {
  try {
    const book = await Book.findById(id);
    if (!book) {
      return next(new Error("invalid id"));
    }
    req.book = book;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    return res.json({ book: req.book });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const books = await Book.list(req.query);
    return res.json({ books });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.json({ book });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await req.book.updateOne(req.body);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.book.delete();
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
