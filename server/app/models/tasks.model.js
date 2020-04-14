const mongoose = require("mongoose");

const Tasks = mongoose.Schema(
  {
    TaskId: { type: Number, required: true },
    TaskNumber: { type: Number, required: true },
    TaskName: { type: String, required: true, min: 0, max: 100 },
    TaskDescription: { type: String, required: true, min: 0, max: 300 },
    TaskDeadline: { type: Date, required: true },
    TaskBonuce: { type: Number, min: 0, max: 10 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", Tasks);
