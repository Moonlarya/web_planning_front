const Reports = require("../models/reports.model.js");

// Create and Save a new Reports
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Report content can not be empty",
    });
  }

  // Create a Reports
  const report = new Reports({
    /*
      ReportId: { type: Number, require: true },
      ReportLink: { type: String, max: 20, require: true },
      ReportDate: { type: Date, require: true }, //DEFAULT CURRENT_DATE check(ReportDate >= CURRENT_DATE),
      ReportPoints: { type: Number, require: true }, // (ReportPoints >0),
      ReportStatus: { type: String, max: 8 }, // CHECK (ReportStatus IN('active', 'disabled', 'problem', 'finished')),
      ReportEmployeeId: { type: Number, require: true },
      ReportTaskId: { type: Number, require: true },
     */
  });

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
exports.findAll = (req, res) => {
  Reports.find()
    .then((reports) => {
      res.send(reports);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reports.",
      });
    });
};

// Find a single report with a ReportId
exports.findOne = (req, res) => {
  Reports.findById(req.params.ReportId)
    .then((report) => {
      if (!report) {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.ReportId,
        });
      }
      res.send(report);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.ReportId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving report with id " + req.params.ReportId,
      });
    });
};

// Update a report identified by the ReportId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Reports content can not be empty",
    });
  }

  // Find report and update it with the request body
  Reports.findByIdAndUpdate(
    req.params.ReportId,
    {
      title: req.body.title || "Untitled Reports",
      content: req.body.content,
    },
    { new: true }
  )
    .then((report) => {
      if (!report) {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.ReportId,
        });
      }
      res.send(report);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.ReportId,
        });
      }
      return res.status(500).send({
        message: "Error updating report with id " + req.params.ReportId,
      });
    });
};

// Delete a report with the specified ReportId in the request
exports.delete = (req, res) => {
  Reports.findByIdAndRemove(req.params.ReportId)
    .then((report) => {
      if (!report) {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.ReportId,
        });
      }
      res.send({ message: "Reports deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Reports not found with id " + req.params.ReportId,
        });
      }
      return res.status(500).send({
        message: "Could not delete report with id " + req.params.ReportId,
      });
    });
};
