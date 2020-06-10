const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const utils = require("../../utils");

const Employees = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String },
    phone: { type: String, required: true, min: 0, max: 20 },
    email: { type: String, required: true, min: 0, max: 20 },
    password: { type: String, required: true, default: "1234" },
    status: { type: String, enum: ["free", "left", "busy"], default: "free" },
    type: {
      type: String,
      enum: [
        "manager",
        "hr",
        "marketolog",
        "copywriter",
        "designer",
        "developer",
      ],
    },
  },
  {
    timestamps: true,
  }
);

Employees.methods.generateAuthToken = function () {
  const { password, ...user } = this.toObject();

  const token = jwt.sign(user, process.env.JWT_SECRET);

  return token;
};

Employees.pre("save", async function () {
  this.password = await utils.getPasswordHash(this.password);
});

module.exports = mongoose.model("Employees", Employees);
