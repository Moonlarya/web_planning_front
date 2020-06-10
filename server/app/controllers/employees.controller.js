const bcrypt = require("bcrypt");

const Employees = require("../models/employees.model.js");

const utils = require("../../utils");

exports.create = async (req, res) => {
  const email = req.body.email;
  const existUser = await Employees.findOne({ email: email });
  if (existUser) {
    return res
      .status(500)
      .send({ message: "User with this email already exists" });
  }

  const employee = new Employees({
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.patronymic,
    status: req.body.status,
    phone: req.body.phone,
    email: req.body.email,
    type: req.body.type,
    password: req.body.password,
  });

  try {
    const data = await employee.save();

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Employee.",
    });
  }
};

exports.findAll = (req, res) => {
  Employees.find()
    .then((employees) => {
      res.send(employees);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};

exports.findOne = (req, res) => {
  Employees.findById(req.params.employeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving employee with id " + req.params.employeeId,
      });
    });
};

exports.update = async (req, res) => {
  const data = { ...req.body };
  if (data.password) {
    data.password = await utils.getPasswordHash(data.password);
  }

  try {
    const employee = await Employees.findByIdAndUpdate(
      req.params.employeeId,
      data,
      { new: true }
    );

    if (!employee) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.employeeId,
      });
    }
    res.send(employee);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Note not found with id " + req.params.employeeId,
      });
    }
    return res.status(500).send({
      message: "Error updating note with id " + req.params.employeeId,
    });
  }
};

exports.delete = (req, res) => {
  Employees.findByIdAndRemove(req.params.employeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Position not found with id " + req.params.employeeId,
        });
      }
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Position not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.employeeId,
      });
    });
};

exports.auth = async (req, res) => {
  try {
    const employee = await Employees.findOne({
      email: req.body.email,
    });

    if (
      !employee ||
      !utils.comparePasswords(req.body.password, employee.password)
    ) {
      throw new Error("Incorrect login/password");
    }

    const token = employee.generateAuthToken();

    res.send({
      token,
      user: employee.toObject(),
    });
  } catch (err) {
    res.status(404).send({
      message: err.message || "Incorrect login/password",
    });
  }
};

exports.deleteAll = (req, res) => {
  Employees.deleteMany({})
    .then(() => {
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cannot delete",
      });
    });
};
