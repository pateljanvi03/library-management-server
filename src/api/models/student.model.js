const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    branchId: {
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
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

Student.virtual("branch", {
  ref: "Branch",
  localField: "branchId",
  foreignField: "_id",
  justOne: true,
});

Student.statics = {
  list(filterQuery) {
    const options = {};
    if (filterQuery.enrollmentNumber) {
      options.enrollmentNumber = filterQuery.enrollmentNumber;
    }
    if (filterQuery.name) {
      options.name = { $regex: filterQuery.name };
    }
    if (filterQuery.branchId) {
      options.branch = filterQuery.branchId;
    }
    if (filterQuery.batch) {
      options.batch = filterQuery.batch;
    }

    const page = parseInt(filterQuery.page) || 1;
    const limit = parseInt(filterQuery.limit) || 5;

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(limit * (page - 1))
      .limit(limit);
  },
};

module.exports = mongoose.model("Student", Student);
