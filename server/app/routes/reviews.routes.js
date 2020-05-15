module.exports = (app) => {
  const reviews = require("../controllers/reviews.controller.js");

  // Create a new client
  app.post("/reviews", reviews.create);

  // Retrieve all reviews
  app.get("/reviews", reviews.findAll);

  // Retrieve a single client with reviewId
  app.get("/reviews/:reviewId", reviews.findOne);

  // Update a client with reviewId
  app.put("/reviews/:reviewId", reviews.update);

  // Delete a client with reviewId
  app.delete("/reviews/:reviewId", reviews.delete);

  app.post("/reviews/create-employee", reviews.createEmployee);
};
