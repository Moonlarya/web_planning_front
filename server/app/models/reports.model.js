const mongoose = require("mongoose");

const Reports = mongoose.Schema(
  {
    ReportId: { type: Number, require: true },
    ReportLink: { type: String, max: 20, require: true },
    ReportDate: { type: Date, require: true }, //DEFAULT CURRENT_DATE check(ReportDate >= CURRENT_DATE),
    ReportPoints: { type: Number, require: true }, // (ReportPoints >0),
    ReportStatus: { type: String, max: 8 }, // CHECK (ReportStatus IN('active', 'disabled', 'problem', 'finished')),
    ReportEmployeeId: { type: Number, require: true },
    ReportTaskId: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reports", Reports);
