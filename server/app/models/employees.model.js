const mongoose = require("mongoose");

const Employees = mongoose.Schema(
  {
    EmployeeId: { type: Number, required: true },
    EmployeeName: { type: String, required: true, min: 0, max: 30 },
    EmployeeType: { type: String, required: true, min: 0, max: 20 },
    EmployeeStatus: { type: String, required: true, min: 0, max: 4 }, //???? CHECK (EmployeeStatus IN('free', 'left', 'busy'))
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employees", Employees);
