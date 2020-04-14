const mongoose = require("mongoose");

const Salaries = mongoose.Schema(
  {
    SalaryId: { type: Number, required: true },
    SalarySumm: { type: Number, required: true },
    SalaryMonth: { type: String, required: true }, //CHECK (SalaryMonth IN('jan', 'feb', 'mch', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec')),
    SalaryYear: { type: Number, required: true },
    SalaryEmployeeId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Salaries", Salaries);
