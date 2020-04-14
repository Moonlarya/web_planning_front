const mongoose = require("mongoose");

const Interviews = mongoose.Schema(
  {
    InterviewId: { type: Number, required: true },
    InterviewKind: { type: String }, //CHECK (InterviewKind IN('hr', 'technical', 'manager')) ,
    InterviewData: { type: Date, required: true },
    InterviewResult: { type: String, min: 0, max: 300 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interviews", Interviews);
