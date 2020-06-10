const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Calendar = mongoose.Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employees" },
    review: { type: String, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["hr", "technical"] },
    result: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calendar", Calendar);
