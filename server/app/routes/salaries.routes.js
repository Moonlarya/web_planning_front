const auth = require("../middlewares/auth");

module.exports = (app) => {
  const salaries = require("../controllers/salaries.controller.js");

  // Create a new client
  app.post("/salaries", auth, salaries.create);

  // Retrieve all salaries
  app.get("/salaries", auth, salaries.findAll);

  // Retrieve a single client with salaryId
  app.get("/salaries/:salaryId", auth, salaries.findOne);

  // Update a client with salaryId
  app.put("/salaries/:salaryId", auth, salaries.update);

  // Delete a client with salaryId
  app.delete("/salaries/:salaryId", auth, salaries.delete);
};
