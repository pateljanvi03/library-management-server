/**
 * Load user and append to req.
 * @public
 */
 exports.load = async (req, res, next, id) => {
  try {
    // const user = await User.get(id);
    // req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.get = (req, res) => {
  // res.json(req.locals.user.transform()
};

exports.list = (req, res) => {
  return res.send('ok')
}

exports.create = (req, res) => {
  return res.send('ok')
}

exports.update = (req, res) => {
  return res.send('ok')
}

exports.remove = (req, res) => {
  return res.send('ok')
}
