const mongoose = require("mongoose");

const Category = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

Category.statics = {
  list(filterQuery) {
    const page = parseInt(filterQuery.page) || 1;
    const limit = parseInt(filterQuery.limit) || 5;

    return this.find()
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  },
};

module.exports = mongoose.model("Category", Category);
