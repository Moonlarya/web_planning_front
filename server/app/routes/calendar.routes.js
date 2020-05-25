module.exports = (app) => {
  const calendar = require("../controllers/calendar.controller.js");

  // Create a new client
  app.post("/calendar", calendar.create);

  // Retrieve all clients
  app.get("/calendar", calendar.findAll);

  // Retrieve a single client with clientId
  app.get("/calendar/:calendarId", calendar.findOne);

  // Update a client with clientId
  app.put("/calendar/:calendarId", calendar.update);

  // Delete a client with clientId
  app.delete("/calendar/:calendarId", calendar.delete);
};
