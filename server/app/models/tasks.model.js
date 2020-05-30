const mongoose = require("mongoose");

const Tasks = mongoose.Schema(
  {
    order: { type: Number, required: true }, //порядок задачи
    name: { type: String, required: true, min: 0, max: 100 },
    description: { type: String, required: true, min: 0, max: 300 },
    deadline: { type: Date, required: true },
    bonuce: { type: Number, min: 0, max: 10 },
    employee: { type: String },
    status: { type: String, default: "active", enum: ["active", "finished"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", Tasks);
