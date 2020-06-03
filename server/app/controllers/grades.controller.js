const Grades = require("../models/grades.model.js");

// Create and Save a new Grades
exports.create = (req, res) => {
  const grade = new Grades(req.body);
  console.log(req.body);

  // Save Grades in the database
  grade
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Grades.",
      });
    });
};

// Retrieve and return all grades from the database.
exports.findAll = (req, res) => {
  Grades.find()
    .then((grades) => {
      res.send(grades);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving grades.",
      });
    });
};

// Find a single grade with a gradeId
exports.findOne = (req, res) => {
  Grades.findById(req.params.gradeId)
    .then((grade) => {
      if (!grade) {
        return res.status(404).send({
          message: "Grades not found with id " + req.params.gradeId,
        });
      }
      res.send(grade);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Grades not found with id " + req.params.gradeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving grade with id " + req.params.gradeId,
      });
    });
};

// Update a grade identified by the gradeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Grades content can not be empty",
    });
  }

  // Find grade and update it with the request body
  Grades.findByIdAndUpdate(
    req.params.gradeId,
    {
      title: req.body.title || "Untitled Grades",
      content: req.body.content,
    },
    { new: true }
  )
    .then((grade) => {
      if (!grade) {
        return res.status(404).send({
          message: "Grades not found with id " + req.params.gradeId,
        });
      }
      res.send(grade);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Grades not found with id " + req.params.gradeId,
        });
      }
      return res.status(500).send({
        message: "Error updating grade with id " + req.params.gradeId,
      });
    });
};

// Delete a grade with the specified gradeId in the request
exports.delete = (req, res) => {
  Grades.findByIdAndRemove(req.params.gradeId)
    .then((grade) => {
      if (!grade) {
        return res.status(404).send({
          message: "Grades not found with id " + req.params.gradeId,
        });
      }
      res.send({ message: "Grades deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Grades not found with id " + req.params.gradeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete grade with id " + req.params.gradeId,
      });
    });
};

exports.findAllbyEmployee = async (req, res) => {
  console.log(req.params);
  try {
    const grades = await Grades.find({
      employeeId: req.params.employeeId,
    }).lean();
    res.send(grades);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving grades.",
    });
  }
};
