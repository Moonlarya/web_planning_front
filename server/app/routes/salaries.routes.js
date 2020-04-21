module.exports = (app) => {
  const salaries = require("../controllers/salaries.controller.js");

  // Create a new client
  app.post("/salaries", salaries.create);

  // Retrieve all salaries
  app.get("/salaries", salaries.findAll);

  // Retrieve a single client with salaryId
  app.get("/salaries/:salaryId", salaries.findOne);

  // Update a client with salaryId
  app.put("/salaries/:salaryId", salaries.update);

  // Delete a client with salaryId
  app.delete("/salaries/:salaryId", salaries.delete);
};
