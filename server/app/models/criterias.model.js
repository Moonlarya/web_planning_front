const mongoose = require("mongoose");

const Criterias = mongoose.Schema(
  {
    CriteriaId: { type: Number, required: true },
    CriteriaName: { type: String, required: true, min: 1, max: 100 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Criterias", Criterias);
