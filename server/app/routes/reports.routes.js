const auth = require("../middlewares/auth");

module.exports = (app) => {
  const reports = require("../controllers/reports.controller.js");

  // Create a new client
  app.post("/reports", auth, reports.create);

  // Retrieve all reports
  app.get("/reports", auth, reports.findAll);

  // Retrieve a single client with reportId
  app.get("/reports/:reportId", auth, reports.findOne);

  // Update a client with reportId
  app.put("/reports/:reportId", auth, reports.update);

  // Delete a client with reportId
  app.delete("/reports/:reportId", auth, reports.delete);

  app.get("/reports/project/:projectId", auth, reports.findAllbyProject);
};
