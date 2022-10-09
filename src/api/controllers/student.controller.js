const Student = require("../models/student.model");

exports.load = async (req, res, next, id) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      return next(new Error("invalid id"));
    }
    req.student = student;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res, next) => {
  try {
    return res.json({ student: req.student });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const students = await Student.list(req.query).populate("branch", "title");
    return res.json({ students });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    return res.json({ student });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await req.student.update(req.body);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await req.student.delete();
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
