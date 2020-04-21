module.exports = (app) => {
  const interviews = require("../controllers/interviews.controller.js");

  // Create a new client
  app.post("/interviews", interviews.create);

  // Retrieve all interviews
  app.get("/interviews", interviews.findAll);

  // Retrieve a single client with interviewsId
  app.get("/interviews/:interviewId", interviews.findOne);

  // Update a client with interviewsId
  app.put("/interviews/:interviewId", interviews.update);

  // Delete a client with interviewsId
  app.delete("/interviews/:interviewId", interviews.delete);
};
