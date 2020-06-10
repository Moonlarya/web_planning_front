const Reports = require("../models/reports.model.js");
const Tasks = require("../models/tasks.model.js");
const Project = require("../models/projects.model.js");

// Create and Save a new Reports
exports.create = (req, res) => {
  // Create a Reports
  const report = new Reports(req.body);

  // Save Reports in the database
  report
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reports.",
      });
    });
};

// Retrieve and return all reports from the database.
exports.findAll = async (req, res) => {
  try {
    const reports = await Reports.find().lean();
    const reportWithTask = await Promise.all(
      reports.map(async (el) => {
        try {
          if (el.taskId) {
            const task = await Tasks.findById(el.taskId);
            return { ...el, taskId: task };
          } else {
            return el;
          }
        } catch (err) {
          console.log(err);
          return el;
        }
      })
    );
    const reportWithProject = await Promise.all(
      reportWithTask.map(async (el) => {
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
    res.send(reportWithProject);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving reports.",
    });
  }
};

// Find a single report with a reportId
exports.findOne = (req, res) => {
  Reports.findById(req.params.reportId)
    .then((report) => {
      if (!report) {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.reportId,
        });
      }
      res.send(report);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.reportId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving report with id " + req.params.reportId,
      });
    });
};

// Update a report identified by the reportId in the request
exports.update = (req, res) => {
  // Find report and update it with the request body
  Reports.findByIdAndUpdate(req.params.reportId, req.body, { new: true })
    .then((report) => {
      if (!report) {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.reportId,
        });
      }
      res.send(report);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.reportId,
        });
      }
      return res.status(500).send({
        message: "Error updating report with id " + req.params.reportId,
      });
    });
};

// Delete a report with the specified reportId in the request
exports.delete = (req, res) => {
  Reports.findByIdAndRemove(req.params.reportId)
    .then((report) => {
      if (!report) {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.reportId,
        });
      }
      res.send({ message: "Reports deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.reportId,
        });
      }
      return res.status(500).send({
        message: "Could not delete report with id " + req.params.reportId,
      });
    });
};

exports.findAllbyProject = async (req, res) => {
  try {
    const reports = await Reports.find({
      project: req.params.projectId,
    }).lean();
    res.send(reports);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

exports.deleteAll = (req, res) => {
  Reports.deleteMany({})
    .then(() => {
      res.send({ message: "Position deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Cannot delete",
      });
    });
};
