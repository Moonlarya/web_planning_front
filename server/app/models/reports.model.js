const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reports = mongoose.Schema(
  {
    link: { type: String, require: true },
    description: { type: String },
    date: { type: Date, default: Date.now, require: true },
    finishDate: { type: Date },
    bonuce: { type: Number, require: true },
    status: {
      type: String,
      enum: ["active", "disabled", "problem", "finished"],
      max: 8,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      require: true,
    },
    taskId: { type: Schema.Types.ObjectId, ref: "Tasks", require: true },
    project: { type: Schema.Types.ObjectId, ref: "Projects", require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reports", Reports);
