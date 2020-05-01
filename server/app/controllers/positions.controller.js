const Positions = require("../models/positions.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  // Create a Note
  const position = new Positions({
    positionName: req.body.positionName,
  });

  // Save Note in the database
  position
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Position.",
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Positions.find()
    .then((positions) => {
      res.send(positions);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving positions.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Positions.findById(req.params.positionId)
    .then((position) => {
      if (!position) {
        return res.status(404).send({
          message: "Position not found with id " + req.params.positionId,
        });
      }
      res.send(position);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Position not found with id " + req.params.positionId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving position with id " + req.params.positionId,
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Position content can not be empty",
    });
  }

  // Find note and update it with the request body
  Positions.findByIdAndUpdate(
    req.params.positionId,
    {
      title: req.body.title || "Untitled Position",
      content: req.body.content,
    },
    { new: true }
  )
    .then((position) => {
      if (!position) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.positionId,
        });
      }
      res.send(position);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.positionId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.positionId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Positions.findByIdAndRemove(req.params.positionId)
    .then((position) => {
      if (!position) {
        return res.status(404).send({
          message: "Position not found with id " + req.params.positionId,
        });
      }
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Position not found with id " + req.params.positionId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.positionId,
      });
    });
};
