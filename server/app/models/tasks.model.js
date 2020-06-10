const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tasks = mongoose.Schema(
  {
    name: { type: String, required: true, min: 0, max: 100 },
    description: { type: String, required: true, min: 0, max: 300 },
    deadline: { type: Date, required: true },
    order: { type: Number },
    bonuce: { type: Number },
    earnedBonuce: { type: Number, default: 0 },
    finishDate: { type: Date },
    employee: { type: Schema.Types.ObjectId, ref: "Employees" },
    status: { type: String, default: "active", enum: ["active", "finished"] },
    project: { type: Schema.Types.ObjectId, ref: "Projects" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", Tasks);
