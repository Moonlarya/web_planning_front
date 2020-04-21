const mongoose = require("mongoose");

const Projects = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    budget: { type: Number },
    clientId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", Projects);
