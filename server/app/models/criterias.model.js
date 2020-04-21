const mongoose = require("mongoose");

const Criterias = mongoose.Schema(
  {
    name: { type: String, required: true, min: 1, max: 100 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Criterias", Criterias);
