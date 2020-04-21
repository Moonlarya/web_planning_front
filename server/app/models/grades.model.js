const mongoose = require("mongoose");

const Grades = mongoose.Schema(
  {
    criteriaId: { type: String, required: true },
    employeeId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grades", Grades);
