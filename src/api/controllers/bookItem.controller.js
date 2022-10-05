const BookItem = require("../models/bookItem.model");

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

exports.get = (req, res) => {
  try {
    return res.json({ bookItem: req.bookItem });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res) => {
  try {
    const bookItems = await BookItem.find();
    return res.json({ bookItems });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res) => {
  try {
    const bookItem = await BookItem.create(req.body);
    return res.json({ bookItem });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res) => {
  try {
    await req.bookItem.updateOne(req.body);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res) => {
  try {
    await req.bookItem.delete();
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
