const mongoose = require("mongoose");

const Reviews = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String, required: true },
    email: { type: String, required: true, min: 0, max: 100 },
    phone: { type: String },
    type: { type: String, min: 0, max: 20 },
    description: { type: String, min: 0, max: 300 },
    priority: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reviews", Reviews);
