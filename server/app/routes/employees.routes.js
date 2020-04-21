module.exports = (app) => {
  const employees = require("../controllers/employees.controller.js");

  // Create a new client
  app.post("/employees", employees.create);

  // Retrieve all employees
  app.get("/employees", employees.findAll);

  // Retrieve a single client with employeeId
  app.get("/employees/:employeeId", employees.findOne);

  // Update a client with employeeId
  app.put("/employees/:employeeId", employees.update);

  // Delete a client with employeeId
  app.delete("/employees/:employeeId", employees.delete);
};
