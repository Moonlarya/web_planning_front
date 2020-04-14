const mongoose = require("mongoose");

const Reviews = mongoose.Schema(
  {
    ReviewId: { type: Number, required: true },
    ReviewName: { type: String, required: true, min: 0, max: 100 },
    ReviewEmail: { type: String, required: true, min: 0, max: 100 },
    ReviewPhone: { type: Number, max: 13 },
    ReviewDescription: { type: String, min: 0, max: 300 },
    ReviewPriority: { type: Number, min: 5, msx: 5 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reviews", Reviews);
