const mongoose = require("mongoose");

const Reports = mongoose.Schema(
  {
    link: { type: String, max: 20, require: true },
    description: { type: String },
    date: { type: Date, default: Date.now, require: true },
    finishDate: { type: Date },
    bonuce: { type: Number, require: true },
    status: {
      type: String,
      enum: ["active", "disabled", "problem", "finished"],
      max: 8,
    },
    employeeId: { type: String, require: true },
    taskId: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reports", Reports);
