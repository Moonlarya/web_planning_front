const auth = require("../middlewares/auth");

module.exports = (app) => {
  const positions = require("../controllers/positions.controller.js");

  // Create a new client
  app.post("/api/positions", auth, positions.create);

  // Retrieve all positions
  app.get("/api/positions", auth, positions.findAll);

  // Retrieve a single client with positionId
  app.get("/api/positions/:positionId", auth, positions.findOne);

  // Update a client with positionId
  app.put("/api/positions/:positionId", auth, positions.update);

  // Delete a client with positionId
  app.delete("/api/positions/:positionId", auth, positions.delete);
};
