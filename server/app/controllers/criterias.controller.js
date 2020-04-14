const Criterias = require("../models/criterias.model.js");

// Create and Save a new Criterias
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Criteria content can not be empty",
    });
  }

  // Create a Criterias
  const criteria = new Criterias({
    /*
      CriteriaId: { type: Number, required: true },
      CriteriaName: { type: String, required: true, min: 1, max: 100 },
     */
  });

  // Save Criterias in the database
  criteria
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Criterias.",
      });
    });
};

// Retrieve and return all criterias from the database.
exports.findAll = (req, res) => {
  Criterias.find()
    .then((criterias) => {
      res.send(criterias);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving criterias.",
      });
    });
};

// Find a single criteria with a CriteriaId
exports.findOne = (req, res) => {
  Criterias.findById(req.params.CriteriaId)
    .then((criteria) => {
      if (!criteria) {
        return res.status(404).send({
          message: "Criterias not found with id " + req.params.CriteriaId,
        });
      }
      res.send(criteria);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Criterias not found with id " + req.params.CriteriaId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving criteria with id " + req.params.CriteriaId,
      });
    });
};

// Update a criteria identified by the CriteriaId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Criterias content can not be empty",
    });
  }

  // Find criteria and update it with the request body
  Criterias.findByIdAndUpdate(
    req.params.CriteriaId,
    {
      title: req.body.title || "Untitled Criterias",
      content: req.body.content,
    },
    { new: true }
  )
    .then((criteria) => {
      if (!criteria) {
        return res.status(404).send({
          message: "Criterias not found with id " + req.params.CriteriaId,
        });
      }
      res.send(criteria);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Criterias not found with id " + req.params.CriteriaId,
        });
      }
      return res.status(500).send({
        message: "Error updating criteria with id " + req.params.CriteriaId,
      });
    });
};

// Delete a criteria with the specified CriteriaId in the request
exports.delete = (req, res) => {
  Criterias.findByIdAndRemove(req.params.CriteriaId)
    .then((criteria) => {
      if (!criteria) {
        return res.status(404).send({
          message: "Criterias not found with id " + req.params.CriteriaId,
        });
      }
      res.send({ message: "Criterias deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Criterias not found with id " + req.params.CriteriaId,
        });
      }
      return res.status(500).send({
        message: "Could not delete criteria with id " + req.params.CriteriaId,
      });
    });
};
