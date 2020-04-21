module.exports = (app) => {
  const projects = require("../controllers/projects.controller.js");

  // Create a new client
  app.post("/projects", projects.create);

  // Retrieve all projects
  app.get("/projects", projects.findAll);

  // Retrieve a single client with projectId
  app.get("/projects/:projectId", projects.findOne);

  // Update a client with projectId
  app.put("/projects/:projectId", projects.update);

  // Delete a client with projectId
  app.delete("/projects/:projectId", projects.delete);
};
