const Tasks = require("../models/tasks.model.js");
const Employee = require("../models/employees.model.js");
const Project = require("../models/projects.model.js");

// Create and Save a new Tasks
exports.create = (req, res) => {
  // Create a Tasks
  const task = new Tasks(req.body);

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
    const taskWithEmployee = await Promise.all(
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
    const taskWithProject = await Promise.all(
      taskWithEmployee.map(async (el) => {
        try {
          if (el.project) {
            const project = await Project.findById(el.project);
            return { ...el, project: project };
          } else {
            return el;
          }
        } catch (err) {
          console.log(err);
          return el;
        }
      })
    );
    res.send(taskWithProject);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

exports.findAllbyEmployee = async (req, res) => {
  try {
    const tasks = await Tasks.find({ employee: req.params.employeeId }).lean();
    const taskWithEmployee = await Promise.all(
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
    const taskWithProject = await Promise.all(
      taskWithEmployee.map(async (el) => {
        try {
          if (el.project) {
            const project = await Project.findById(el.project);
            return { ...el, project: project };
          } else {
            return el;
          }
        } catch (err) {
          console.log(err);
          return el;
        }
      })
    );
    res.send(taskWithProject);
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
  Tasks.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
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
