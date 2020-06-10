const auth = require("../middlewares/auth");

module.exports = (app) => {
  const reports = require("../controllers/reports.controller.js");

  // Create a new client
  app.post("/api/reports", auth, reports.create);

  // Retrieve all reports
  app.get("/api/reports", auth, reports.findAll);

  app.delete("/api/reports/delete-all", auth, reports.deleteAll);
  // Retrieve a single client with reportId
  app.get("/api/reports/:reportId", auth, reports.findOne);

  // Update a client with reportId
  app.put("/api/reports/:reportId", auth, reports.update);

  // Delete a client with reportId
  app.delete("/api/reports/:reportId", auth, reports.delete);

  app.get("/api/reports/project/:projectId", auth, reports.findAllbyProject);
};
