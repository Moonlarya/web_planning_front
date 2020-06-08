const auth = require("../middlewares/auth");

module.exports = (app) => {
  const criterias = require("../controllers/criterias.controller.js");

  // Create a new client
  app.post("/api/criterias", auth, criterias.create);

  // Retrieve all criterias
  app.get("/api/criterias", auth, criterias.findAll);

  // Retrieve a single client with criteriaId
  app.get("/api/criterias/:criteriaId", auth, criterias.findOne);

  // Update a client with criteriaId
  app.put("/api/criterias/:criteriaId", auth, criterias.update);

  // Delete a client with criteriaId
  app.delete("/api/criterias/:criteriaId", auth, criterias.delete);
};
