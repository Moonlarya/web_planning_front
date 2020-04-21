module.exports = (app) => {
  const reports = require("../controllers/reports.controller.js");

  // Create a new client
  app.post("/reports", reports.create);

  // Retrieve all reports
  app.get("/reports", reports.findAll);

  // Retrieve a single client with reportId
  app.get("/reports/:reportId", reports.findOne);

  // Update a client with reportId
  app.put("/reports/:reportId", reports.update);

  // Delete a client with reportId
  app.delete("/reports/:reportId", reports.delete);
};
