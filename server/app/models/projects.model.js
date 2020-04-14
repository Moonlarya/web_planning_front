const mongoose = require("mongoose");

const Projects = mongoose.Schema(
  {
    ProjectId: { type: Number, required: true },
    ProjectName: { type: String, required: true },
    ProjectDescription: { type: String, required: true },
    ProjectDeadline: { type: Date, required: true },
    ProjectBudget: { type: Number, min: 0, max: 19 },
    ClientId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", Projects);
