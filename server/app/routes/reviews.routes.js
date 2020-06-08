const auth = require("../middlewares/auth");

module.exports = (app) => {
  const reviews = require("../controllers/reviews.controller.js");

  // Create a new client
  app.post("/api/reviews", auth, reviews.create);

  // Retrieve all reviews
  app.get("/api/reviews", auth, reviews.findAll);

  // Retrieve a single client with reviewId
  app.get("/api/reviews/:reviewId", auth, reviews.findOne);

  // Update a client with reviewId
  app.put("/api/reviews/:reviewId", auth, reviews.update);

  // Delete a client with reviewId
  app.delete("/api/reviews/:reviewId", auth, reviews.delete);

  app.post("/api/reviews/create-employee", auth, reviews.createEmployee);
};
