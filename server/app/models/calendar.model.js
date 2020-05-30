const mongoose = require("mongoose");

const Calendar = mongoose.Schema(
  {
    employee: { type: String },
    review: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["hr", "technical"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calendar", Calendar);
