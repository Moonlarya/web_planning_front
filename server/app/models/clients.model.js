const mongoose = require("mongoose");

const Clients = mongoose.Schema(
  {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String },
    patronymic: { type: String },
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clients", Clients);
