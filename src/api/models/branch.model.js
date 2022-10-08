const mongoose = require("mongoose");

const Branch = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

Branch.statics = {
  list(filterQuery) {
    const page = parseInt(filterQuery.page) || 1;
    const limit = parseInt(filterQuery.limit) || 5;

    return this.find()
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  },
};

module.exports = mongoose.model("Branch", Branch);
