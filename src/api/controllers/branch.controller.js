const Branch = require("../models/branch.model");

exports.load = async (req, res, next, id) => {
  try {
    const branch = await Branch.findById(id);
    if (!branch) {
      return next(new Error("invalid id"));
    }

    req.branch = branch;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => {
  try {
    res.json({ branch: req.branch });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res) => {
  try {
    const branches = await Branch.find();
    return res.json({ branches });
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    return res.json({ branch });
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res) => {
  try {
    await req.branch.updateOne(req.body);
    return res.send({ success: true });
  } catch (error) {
    return next(error);
  }
};

exports.remove = async (req, res) => {
  try {
    await req.branch.delete();
    return res.send({ success: true });
  } catch (error) {
    return next(error);
  }
};
