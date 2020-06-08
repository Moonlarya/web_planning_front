const auth = require("../middlewares/auth");

module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller.js");

  // Create a new client
  app.post("/api/tasks", auth, tasks.create);

  // Retrieve all tasks
  app.get("/api/tasks", auth, tasks.findAll);

  // Retrieve a single client with taskId
  app.get("/api/tasks/:taskId", auth, tasks.findOne);

  // Update a client with taskId
  app.put("/api/tasks/:taskId", auth, tasks.update);

  app.delete("/api/tasks/delete-all", auth, tasks.deleteAll);

  // Delete a client with taskId
  app.delete("/api/tasks/:taskId", auth, tasks.delete);

  app.get("/api/tasks/employee/:employeeId", auth, tasks.findAllbyEmployee);
};
