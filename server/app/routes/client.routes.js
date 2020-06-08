const auth = require("../middlewares/auth");

module.exports = (app) => {
  const clients = require("../controllers/clients.controller.js");

  // Create a new client
  app.post("/api/clients", auth, clients.create);

  // Retrieve all clients
  app.get("/api/clients", auth, clients.findAll);

  // Retrieve a single client with clientId
  app.get("/api/clients/:clientId", auth, clients.findOne);

  // Update a client with clientId
  app.put("/api/clients/:clientId", auth, clients.update);

  // Delete a client with clientId
  app.delete("/api/clients/:clientId", auth, clients.delete);
};
