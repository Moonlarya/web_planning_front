const mongoose = require("mongoose");

const Reviews = mongoose.Schema(
  {
    name: { type: String, required: true, min: 0, max: 100 },
    email: { type: String, required: true, min: 0, max: 100 },
    phone: { type: String },
    description: { type: String, min: 0, max: 300 },
    priority: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reviews", Reviews);
