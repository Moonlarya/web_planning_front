const mongoose = require("mongoose");

const Clients = mongoose.Schema(
  {
    phone: { type: Number, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String, required: true },
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clients", Clients);
