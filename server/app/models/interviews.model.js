const mongoose = require("mongoose");

const Interviews = mongoose.Schema(
  {
    interviewKind: { type: String, enum: ["hr", "technical", "manager"] },
    interviewData: { type: Date, required: true },
    taskId: { type: String },
    reviewId: { type: String },
    interviewResult: { type: String, min: 0, max: 300 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interviews", Interviews);
