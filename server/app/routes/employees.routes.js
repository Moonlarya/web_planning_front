const auth = require("../middlewares/auth");

module.exports = (app) => {
  const employees = require("../controllers/employees.controller");

  // Create a new client
  app.post("/employees", auth, employees.create);

  // Retrieve all employees
  app.get("/employees", auth, employees.findAll);

  // Retrieve a single client with employeeId
  app.get("/employees/:employeeId", auth, employees.findOne);

  // Update a client with employeeId
  app.put("/employees/:employeeId", auth, employees.update);

  app.delete("/employees/delete-all", auth, employees.deleteAll);
  // Delete a client with employeeId
  app.delete("/employees/:employeeId", auth, employees.delete);

  app.post("/employees/auth", employees.auth);
};
