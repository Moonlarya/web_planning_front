module.exports = (app) => {
  const tasks = require("../controllers/tasks.controller.js");

  // Create a new client
  app.post("/tasks", tasks.create);

  // Retrieve all tasks
  app.get("/tasks", tasks.findAll);

  // Retrieve a single client with taskId
  app.get("/tasks/:taskId", tasks.findOne);

  // Update a client with taskId
  app.put("/tasks/:taskId", tasks.update);

  app.delete("/tasks/delete-all", tasks.deleteAll);
  // Delete a client with taskId
  app.delete("/tasks/:taskId", tasks.delete);
};
