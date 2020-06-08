const auth = require("../middlewares/auth");

module.exports = (app) => {
  const employees = require("../controllers/employees.controller");

  // Create a new client
  app.post("/api/employees", auth, employees.create);

  // Retrieve all employees
  app.get("/api/employees", auth, employees.findAll);

  // Retrieve a single client with employeeId
  app.get("/api/employees/:employeeId", auth, employees.findOne);

  // Update a client with employeeId
  app.put("/api/employees/:employeeId", auth, employees.update);

  app.delete("/api/employees/delete-all", auth, employees.deleteAll);
  // Delete a client with employeeId
  app.delete("/api/employees/:employeeId", auth, employees.delete);

  app.post("/api/employees/auth", employees.auth);
};
