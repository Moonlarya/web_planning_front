module.exports = (app) => {
  const employees = require("../controllers/employees.controller");

  // Create a new client
  app.post("/employees", employees.create);

  // Retrieve all employees
  app.get("/employees", employees.findAll);

  // Retrieve a single client with employeeId
  app.get("/employees/:employeeId", employees.findOne);

  // Update a client with employeeId
  app.put("/employees/:employeeId", employees.update);

  app.delete("/employees/delete-all", employees.deleteAll);
  // Delete a client with employeeId
  app.delete("/employees/:employeeId", employees.delete);

  app.post("/employees/auth", employees.auth);
};
