const Projects = require("../models/projects.model.js");
const Clients = require("../models/clients.model.js");
const Reports = require("../models/reports.model.js");

// Create and Save a new Projects
exports.create = (req, res) => {
  // Create a Projects
  const project = new Projects({
    name: req.body.name,
    description: req.body.description,
    deadline: req.body.deadline,
    budget: req.body.budget,
    clientId: req.body.clientId,
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
exports.findAll = async (req, res) => {
  try {
    const projects = await Projects.find().lean();
    const populatedProjects = await Promise.all(
      projects.map(async (el) => {
        try {
          if (el.clientId) {
            const client = await Clients.findById(el.clientId);
            return { ...el, clientId: client };
          } else {
            return el;
          }
        } catch (err) {
          return el;
        }
      })
    );
    res.send(populatedProjects);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

// Find a single project with a projectId
exports.findOne = (req, res) => {
  Projects.findById(req.params.projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.projectId,
        });
      }
      res.send(project);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.projectId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving project with id " + req.params.projectId,
      });
    });
};

// Update a project identified by the projectId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Projects content can not be empty",
    });
  }

  // Find project and update it with the request body
  Projects.findByIdAndUpdate(
    req.params.projectId,
    {
      title: req.body.title || "Untitled Projects",
      content: req.body.content,
    },
    { new: true }
  )
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.projectId,
        });
      }
      res.send(project);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.projectId,
        });
      }
      return res.status(500).send({
        message: "Error updating project with id " + req.params.projectId,
      });
    });
};

// Delete a project with the specified projectId in the request
exports.delete = (req, res) => {
  Projects.findByIdAndRemove(req.params.projectId)
    .then((project) => {
      if (!project) {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.projectId,
        });
      }
      res.send({ message: "Projects deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Projects not found with id " + req.params.projectId,
        });
      }
      return res.status(500).send({
        message: "Could not delete project with id " + req.params.projectId,
      });
    });
};
exports.deleteAll = (req, res) => {
  console.log(req);
  Projects.deleteMany({})
    .then(() => {
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cannot delete",
      });
    });
};
