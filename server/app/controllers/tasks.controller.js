const Tasks = require("../models/tasks.model.js");
const Employee = require("../models/employees.model.js");

// Create and Save a new Tasks
exports.create = (req, res) => {
  // Create a Tasks
  const task = new Tasks({
    number: req.body.number,
    name: req.body.name,
    order: req.body.order,
    description: req.body.description,
    deadline: req.body.deadline,
    bonuce: req.body.bonuce,
    employee: req.body.employee,
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

exports.findAll = async (req, res) => {
  try {
    const tasks = await Tasks.find().lean();
    const populatedTasks = await Promise.all(
      tasks.map(async (el) => {
        try {
          if (el.employee) {
            const employee = await Employee.findById(el.employee);
            return { ...el, employee: employee };
          } else {
            return el;
          }
        } catch (err) {
          console.log(err);
          return el;
        }
      })
    );
    res.send(populatedTasks);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
  Tasks.findById(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.taskId,
        });
      }
      res.send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.taskId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + req.params.taskId,
      });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Tasks content can not be empty",
    });
  }

  // Find task and update it with the request body
  Tasks.findByIdAndUpdate(
    req.params.taskId,
    {
      title: req.body.title || "Untitled Tasks",
      content: req.body.content,
    },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.taskId,
        });
      }
      res.send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.taskId,
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + req.params.taskId,
      });
    });
};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {
  Tasks.findByIdAndRemove(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.taskId,
        });
      }
      res.send({ message: "Tasks deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Tasks not found with id " + req.params.taskId,
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.taskId,
      });
    });
};

exports.deleteAll = (req, res) => {
  console.log(req);
  Tasks.deleteMany({})
    .then(() => {
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cannot delete",
      });
    });
};
