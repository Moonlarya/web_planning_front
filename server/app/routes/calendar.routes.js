const auth = require("../middlewares/auth");

module.exports = (app) => {
  const calendar = require("../controllers/calendar.controller.js");

  // Create a new client
  app.post("/calendar", auth, calendar.create);

  // Retrieve all clients
  app.get("/calendar", auth, calendar.findAll);

  // Retrieve a single client with clientId
  app.get("/calendar/:calendarId", auth, calendar.findOne);

  // Update a client with clientId
  app.put("/calendar/:calendarId", auth, calendar.update);

  // Delete a client with clientId
  app.delete("/calendar/:calendarId", auth, calendar.delete);
};
