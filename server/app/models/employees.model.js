const mongoose = require("mongoose");

const Employees = mongoose.Schema(
  {
    employeeId: { type: Number, required: true },
    name: { type: String, required: true, min: 0, max: 30 },
    name: { type: String, required: true, min: 0, max: 20 },
    status: { type: String, required: true, min: 0, max: 4 }, //???? CHECK (status IN('free', 'left', 'busy'))
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employees", Employees);
