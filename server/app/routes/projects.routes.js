const auth = require("../middlewares/auth");

module.exports = (app) => {
  const projects = require("../controllers/projects.controller.js");

  // Create a new client
  app.post("/api/projects", auth, projects.create);

  // Retrieve all projects
  app.get("/api/projects", auth, projects.findAll);

  // Retrieve a single client with projectId
  app.get("/api/projects/:projectId", auth, projects.findOne);

  // Update a client with projectId
  app.put("/api/projects/:projectId", auth, projects.update);

  app.delete("/api/projects/delete-all", auth, projects.deleteAll);
  // Delete a client with projectId
  app.delete("/api/projects/:projectId", auth, projects.delete);
};
