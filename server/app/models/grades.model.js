const mongoose = require("mongoose");

const Grades = mongoose.Schema(
  {
    GradeId: { type: Number, required: true },
    CriteriaId: { type: Number, required: true },
    EmployeeId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grades", Grades);
