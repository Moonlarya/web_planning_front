const Projects = require("../models/projects.model.js");

// Create and Save a new Projects
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Project content can not be empty",
    });
  }

  // Create a Projects
  const project = new Projects({
    /*
      ProjectId: { type: Number, required: true },
      ProjectName: { type: String, required: true },
      ProjectDescription: { type: String, required: true },
      ProjectDeadline: { type: Date, required: true },
      ProjectBudget: { type: Number, min: 0, max: 19 },
      ClientId: { type: Number, required: true },
     */
  });

  // Save Projects in the database
  project
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Projects.",
      });
    });
};

// Retrieve and return all projects from the database.
exports.findAll = (req, res) => {
  Projects.find()
    .then((projects) => {
      res.send(projects);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

// Find a single project with a ProjectId
exports.findOne = (req, res) => {
  Projects.findById(req.params.ProjectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.ProjectId,
        });
      }
      res.send(project);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.ProjectId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id " + req.params.ProjectId,
      });
    });
};

// Update a project identified by the ProjectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Projects content can not be empty",
    });
  }

  // Find project and update it with the request body
  Projects.findByIdAndUpdate(
    req.params.ProjectId,
    {
      title: req.body.title || "Untitled Projects",
      content: req.body.content,
    },
    { new: true }
  )
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.ProjectId,
        });
      }
      res.send(project);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.ProjectId,
        });
      }
      return res.status(500).send({
        message: "Error updating project with id " + req.params.ProjectId,
      });
    });
};

// Delete a project with the specified ProjectId in the request
exports.delete = (req, res) => {
  Projects.findByIdAndRemove(req.params.ProjectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.ProjectId,
        });
      }
      res.send({ message: "Projects deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.ProjectId,
        });
      }
      return res.status(500).send({
        message: "Could not delete project with id " + req.params.ProjectId,
      });
    });
};
