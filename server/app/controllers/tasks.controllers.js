const Tasks = require("../models/tasks.model.js");

// Create and Save a new Tasks
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Task content can not be empty",
    });
  }

  // Create a Tasks
  const task = new Tasks({
    /*
      TaskId: { type: Number, required: true },
    TaskNumber: { type: Number, required: true },
    TaskName: { type: String, required: true, min: 0, max: 100 },
    TaskDescription: { type: String, required: true, min: 0, max: 300 },
    TaskDeadline: { type: Date, required: true },
    TaskBonuce: { type: Number, min: 0, max: 10 },
     */
  });

  // Save Tasks in the database
  task
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tasks.",
      });
    });
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
  Tasks.find()
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Find a single task with a TaskId
exports.findOne = (req, res) => {
  Tasks.findById(req.params.TaskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.TaskId,
        });
      }
      res.send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.TaskId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + req.params.TaskId,
      });
    });
};

// Update a task identified by the TaskId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Tasks content can not be empty",
    });
  }

  // Find task and update it with the request body
  Tasks.findByIdAndUpdate(
    req.params.TaskId,
    {
      title: req.body.title || "Untitled Tasks",
      content: req.body.content,
    },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.TaskId,
        });
      }
      res.send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.TaskId,
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + req.params.TaskId,
      });
    });
};

// Delete a task with the specified TaskId in the request
exports.delete = (req, res) => {
  Tasks.findByIdAndRemove(req.params.TaskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.TaskId,
        });
      }
      res.send({ message: "Tasks deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.TaskId,
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.TaskId,
      });
    });
};
