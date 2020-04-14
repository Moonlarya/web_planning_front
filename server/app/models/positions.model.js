const mongoose = require("mongoose");

const Positions = mongoose.Schema(
  {
    PositionId: { type: Number, required: true },
    PositionName: { type: String, required: true, min: 1, max: 100 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Positions", Positions);
