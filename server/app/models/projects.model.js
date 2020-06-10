const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Projects = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    budget: { type: Number },
    clientId: { type: Schema.Types.ObjectId, ref: "Clients" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Projects", Projects);
