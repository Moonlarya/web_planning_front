const auth = require("../middlewares/auth");

module.exports = (app) => {
  const reviews = require("../controllers/reviews.controller.js");

  // Create a new client
  app.post("/reviews", auth, reviews.create);

  // Retrieve all reviews
  app.get("/reviews", auth, reviews.findAll);

  // Retrieve a single client with reviewId
  app.get("/reviews/:reviewId", auth, reviews.findOne);

  // Update a client with reviewId
  app.put("/reviews/:reviewId", auth, reviews.update);

  // Delete a client with reviewId
  app.delete("/reviews/:reviewId", auth, reviews.delete);

  app.post("/reviews/create-employee", auth, reviews.createEmployee);
};
