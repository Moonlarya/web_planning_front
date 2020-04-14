const mongoose = require("mongoose");

const Clients = mongoose.Schema(
  {
    ClientPhone: { type: Number, required: true },
    ClientName: { type: String, required: true },
    ClientEmail: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clients", Clients);
