const auth = require("../middlewares/auth");

module.exports = (app) => {
  const calendar = require("../controllers/calendar.controller.js");

  // Create a new client
  app.post("/api/calendar", auth, calendar.create);

  // Retrieve all clients
  app.get("/api/calendar", auth, calendar.findAll);

  // Retrieve a single client with clientId
  app.get("/api/calendar/:calendarId", auth, calendar.findOne);

  // Update a client with clientId
  app.put("/api/calendar/:calendarId", auth, calendar.update);

  // Delete a client with clientId
  app.delete("/api/calendar/:calendarId", auth, calendar.delete);
};
