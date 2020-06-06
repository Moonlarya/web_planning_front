const auth = require("../middlewares/auth");

module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller.js");

  // Create a new client
  app.post("/tasks", auth, tasks.create);

  // Retrieve all tasks
  app.get("/tasks", auth, tasks.findAll);

  // Retrieve a single client with taskId
  app.get("/tasks/:taskId", auth, tasks.findOne);

  // Update a client with taskId
  app.put("/tasks/:taskId", auth, tasks.update);

  app.delete("/tasks/delete-all", auth, tasks.deleteAll);

  // Delete a client with taskId
  app.delete("/tasks/:taskId", auth, tasks.delete);

  app.get("/tasks/employee/:employeeId", auth, tasks.findAllbyEmployee);
};
