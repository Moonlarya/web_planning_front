const mongoose = require("mongoose");

const Reports = mongoose.Schema(
  {
    link: { type: String, max: 20, require: true },
    date: { type: Date, default: Date.now, require: true }, //DEFAULT CURRENT_DATE check(ReportDate >= CURRENT_DATE),
    points: { type: Number, require: true }, // (ReportPoints >0),
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
