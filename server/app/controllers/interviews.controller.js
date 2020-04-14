const Interviews = require("../models/interviews.model.js");

// Create and Save a new Interviews
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Interview content can not be empty",
    });
  }

  // Create a Interviews
  const interview = new Interviews({
    /*
      InterviewPhone: { type: Number, required: true },
      InterviewName: { type: String, required: true },
      InterviewEmail: String,
     */
  });

  // Save Interviews in the database
  interview
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Interviews.",
      });
    });
};

// Retrieve and return all interviews from the database.
exports.findAll = (req, res) => {
  Interviews.find()
    .then((interviews) => {
      res.send(interviews);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving interviews.",
      });
    });
};

// Find a single interview with a InterviewId
exports.findOne = (req, res) => {
  Interviews.findById(req.params.InterviewId)
    .then((interview) => {
      if (!interview) {
        return res.status(404).send({
          message: "Interviews not found with id " + req.params.InterviewId,
        });
      }
      res.send(interview);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Interviews not found with id " + req.params.InterviewId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving interview with id " + req.params.InterviewId,
      });
    });
};

// Update a interview identified by the InterviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Interviews content can not be empty",
    });
  }

  // Find interview and update it with the request body
  Interviews.findByIdAndUpdate(
    req.params.InterviewId,
    {
      title: req.body.title || "Untitled Interviews",
      content: req.body.content,
    },
    { new: true }
  )
    .then((interview) => {
      if (!interview) {
        return res.status(404).send({
          message: "Interviews not found with id " + req.params.InterviewId,
        });
      }
      res.send(interview);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Interviews not found with id " + req.params.InterviewId,
        });
      }
      return res.status(500).send({
        message: "Error updating interview with id " + req.params.InterviewId,
      });
    });
};

// Delete a interview with the specified InterviewId in the request
exports.delete = (req, res) => {
  Interviews.findByIdAndRemove(req.params.InterviewId)
    .then((interview) => {
      if (!interview) {
        return res.status(404).send({
          message: "Interviews not found with id " + req.params.InterviewId,
        });
      }
      res.send({ message: "Interviews deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Interviews not found with id " + req.params.InterviewId,
        });
      }
      return res.status(500).send({
        message: "Could not delete interview with id " + req.params.InterviewId,
      });
    });
};
