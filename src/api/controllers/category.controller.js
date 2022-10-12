const Category = require("../models/category.model");

/**
 * Load category and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      return next(new Error("Invalid id"));
    }

    req.category = category;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    res.json({ category: req.category });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const categories = await Category.find(req.query).populate("booksCount");

    return res.json({ categories });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return res.send({ category });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await req.category.updateOne(req.body);
    return res.send({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.category.delete();
    return res.send({ success: true });
  } catch (error) {
    return next(error);
  }
};
