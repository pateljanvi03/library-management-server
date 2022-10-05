const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    enrollmentNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    batch: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", Student);
