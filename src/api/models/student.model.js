const mongoose = require('mongoose');

const Student = new mongoose.Schema(
  {
    name: {
      type: String
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch"
    },
    enrollmentNumber: {
      type: Number
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    batch: {
      type: Number
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Student', Student);
