const auth = require("../middlewares/auth");

module.exports = (app) => {
  const projects = require("../controllers/projects.controller.js");

  // Create a new client
  app.post("/projects", auth, projects.create);

  // Retrieve all projects
  app.get("/projects", auth, projects.findAll);

  // Retrieve a single client with projectId
  app.get("/projects/:projectId", auth, projects.findOne);

  // Update a client with projectId
  app.put("/projects/:projectId", auth, projects.update);

  app.delete("/projects/delete-all", auth, projects.deleteAll);
  // Delete a client with projectId
  app.delete("/projects/:projectId", auth, projects.delete);
};
