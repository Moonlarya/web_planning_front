const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Grades = mongoose.Schema(
  {
    criteriaId: {
      type: Schema.Types.ObjectId,
      ref: "Criterias",
      required: true,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    grade: { type: Number, min: 1, max: 5, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grades", Grades);
