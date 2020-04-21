module.exports = (app) => {
  const positions = require("../controllers/positions.controller.js");

  // Create a new client
  app.post("/positions", positions.create);

  // Retrieve all positions
  app.get("/positions", positions.findAll);

  // Retrieve a single client with positionId
  app.get("/positions/:positionId", positions.findOne);

  // Update a client with positionId
  app.put("/positions/:positionId", positions.update);

  // Delete a client with positionId
  app.delete("/positions/:positionId", positions.delete);
};
