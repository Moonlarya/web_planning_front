const mongoose = require("mongoose");

const Salaries = mongoose.Schema(
  {
    summ: { type: Number, required: true },
    month: {
      type: String,
      enum: [
        "jan",
        "feb",
        "mch",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ],
      required: true,
    },
    year: { type: Number, required: true },
    employeeId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Salaries", Salaries);
