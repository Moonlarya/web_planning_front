const Employees = require("../models/employees.model.js");

exports.create = (req, res) => {
  const employee = new Employees({
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.surname,
    status: req.body.status,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  employee
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    });
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Employee content can not be empty",
    });
  }

  // Find note and update it with the request body
  Employees.findByIdAndUpdate(
    req.params.employeeId,
    {
      title: req.body.title || "Untitled Position",
      content: req.body.content,
    },
    { new: true }
  )
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.employeeId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.employeeId,
      });
    });
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

exports.auth = (req, res) => {
  Employees.findOne({ email: req.body.email, password: req.body.password })
    .then((employee) => {
      if (!employee) {
        throw new Error("Incorrect login/password");
      }
      res.send(employee);
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "Incorrect login/password",
      });
    });
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
