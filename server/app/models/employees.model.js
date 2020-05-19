const mongoose = require("mongoose");

const Employees = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String, required: true },
    type: { type: String, min: 0, max: 20 },
    phone: { type: String, required: true, min: 0, max: 20 },
    email: { type: String, required: true, min: 0, max: 20 },
    status: { type: String, min: 0, max: 4 }, //???? CHECK (status IN('free', 'left', 'busy'))
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employees", Employees);
