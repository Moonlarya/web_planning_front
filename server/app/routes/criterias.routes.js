module.exports = (app) => {
  const criterias = require("../controllers/criterias.controller.js");

  // Create a new client
  app.post("/criterias", criterias.create);

  // Retrieve all criterias
  app.get("/criterias", criterias.findAll);

  // Retrieve a single client with criteriaId
  app.get("/criterias/:criteriaId", criterias.findOne);

  // Update a client with criteriaId
  app.put("/criterias/:criteriaId", criterias.update);

  // Delete a client with criteriaId
  app.delete("/criterias/:criteriaId", criterias.delete);
};
