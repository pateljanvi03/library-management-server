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

module.exports = mongoose.model("Branch", Branch);
