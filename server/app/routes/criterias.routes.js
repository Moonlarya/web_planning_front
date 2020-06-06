const auth = require("../middlewares/auth");

module.exports = (app) => {
  const criterias = require("../controllers/criterias.controller.js");

  // Create a new client
  app.post("/criterias", auth, criterias.create);

  // Retrieve all criterias
  app.get("/criterias", auth, criterias.findAll);

  // Retrieve a single client with criteriaId
  app.get("/criterias/:criteriaId", auth, criterias.findOne);

  // Update a client with criteriaId
  app.put("/criterias/:criteriaId", auth, criterias.update);

  // Delete a client with criteriaId
  app.delete("/criterias/:criteriaId", auth, criterias.delete);
};
