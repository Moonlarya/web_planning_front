const Salaries = require("../models/salaries.model.js");

// Create and Save a new Salaries
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Salarie content can not be empty",
    });
  }

  // Create a Salaries
  const salary = new Salaries({
    /*
   SalaryId: { type: Number, required: true },
    SalarySumm: { type: Number, required: true },
    SalaryMonth: { type: String, required: true }, //CHECK (SalaryMonth IN('jan', 'feb', 'mch', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec')),
    SalaryYear: { type: Number, required: true },
    SalaryEmployeeId: { type: Number, required: true },
 */
  });

  // Save Salaries in the database
  salary
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Salaries.",
      });
    });
};

// Retrieve and return all salarys from the database.
exports.findAll = (req, res) => {
  Salaries.find()
    .then((salaries) => {
      res.send(salaries);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving salarys.",
      });
    });
};

// Find a single salary with a SalarieId
exports.findOne = (req, res) => {
  Salaries.findById(req.params.SalaryId)
    .then((salary) => {
      if (!salary) {
        return res.status(404).send({
          message: "Salaries not found with id " + req.params.SalaryId,
        });
      }
      res.send(salary);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Salaries not found with id " + req.params.SalaryId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving salary with id " + req.params.SalaryId,
      });
    });
};

// Update a salary identified by the SalaryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Salaries content can not be empty",
    });
  }

  // Find salary and update it with the request body
  Salaries.findByIdAndUpdate(
    req.params.SalaryId,
    {
      title: req.body.title || "Untitled Salaries",
      content: req.body.content,
    },
    { new: true }
  )
    .then((salary) => {
      if (!salary) {
        return res.status(404).send({
          message: "Salaries not found with id " + req.params.SalaryId,
        });
      }
      res.send(salary);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Salaries not found with id " + req.params.SalaryId,
        });
      }
      return res.status(500).send({
        message: "Error updating salary with id " + req.params.SalaryId,
      });
    });
};

// Delete a salary with the specified SalarieId in the request
exports.delete = (req, res) => {
  Salaries.findByIdAndRemove(req.params.SalaryId)
    .then((salary) => {
      if (!salary) {
        return res.status(404).send({
          message: "Salaries not found with id " + req.params.SalaryId,
        });
      }
      res.send({ message: "Salaries deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Salaries not found with id " + req.params.SalaryId,
        });
      }
      return res.status(500).send({
        message: "Could not delete salary with id " + req.params.SalaryId,
      });
    });
};
