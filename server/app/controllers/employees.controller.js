const Employees = require("../models/employees.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Employee content can not be empty",
    });
  }

  // Create a Note
  const employee = new Employees({
    /* EmployeeId: { type: Number, required: true },
    EmployeeName: { type: String, required: true, min: 0, max: 30 },
    EmployeeType: { type: String, required: true, min: 0, max: 20 },
    EmployeeStatus: { type: String, required: true, min: 0, max: 4 }, //???? CHECK (EmployeeStatus IN('free', 'left', 'busy'))
 */
    title: req.body.title || "Untitled Employee",
    content: req.body.content,
  });

  // Save Note in the database
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

// Retrieve and return all notes from the database.
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

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Employees.findById(req.params.EmployeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.EmployeeId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.EmployeeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving employee with id " + req.params.EmployeeId,
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
    req.params.EmployeeId,
    {
      title: req.body.title || "Untitled Position",
      content: req.body.content,
    },
    { new: true }
  )
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.EmployeeId,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.EmployeeId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.EmployeeId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Employees.findByIdAndRemove(req.params.EmployeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Position not found with id " + req.params.EmployeeId,
        });
      }
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Position not found with id " + req.params.EmployeeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.EmployeeId,
      });
    });
};
