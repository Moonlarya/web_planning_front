const auth = require("../middlewares/auth");

module.exports = (app) => {
  const clients = require("../controllers/clients.controller.js");

  // Create a new client
  app.post("/clients", auth, clients.create);

  // Retrieve all clients
  app.get("/clients", auth, clients.findAll);

  // Retrieve a single client with clientId
  app.get("/clients/:clientId", auth, clients.findOne);

  // Update a client with clientId
  app.put("/clients/:clientId", auth, clients.update);

  // Delete a client with clientId
  app.delete("/clients/:clientId", auth, clients.delete);
};
