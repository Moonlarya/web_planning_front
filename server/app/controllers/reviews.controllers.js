const Reviews = require("../models/reviews.model.js");

// Create and Save a new Reviews
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Review content can not be empty",
    });
  }

  // Create a Reviews
  const review = new Reviews({
    /*
       ReviewId: { type: Number, required: true },
    ReviewName: { type: String, required: true, min: 0, max: 100 },
    ReviewEmail: { type: String, required: true, min: 0, max: 100 },
    ReviewPhone: { type: Number, max: 13 },
    ReviewDescription: { type: String, min: 0, max: 300 },
    ReviewPriority: { type: Number, min: 5, msx: 5 },
     */
  });

  // Save Reviews in the database
  review
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reviews.",
      });
    });
};

// Retrieve and return all reviews from the database.
exports.findAll = (req, res) => {
  Reviews.find()
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reviews.",
      });
    });
};

// Find a single review with a ReviewId
exports.findOne = (req, res) => {
  Reviews.findById(req.params.ReviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.ReviewId,
        });
      }
      res.send(review);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.ReviewId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving review with id " + req.params.ReviewId,
      });
    });
};

// Update a review identified by the ReviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Reviews content can not be empty",
    });
  }

  // Find review and update it with the request body
  Reviews.findByIdAndUpdate(
    req.params.ReviewId,
    {
      title: req.body.title || "Untitled Reviews",
      content: req.body.content,
    },
    { new: true }
  )
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.ReviewId,
        });
      }
      res.send(review);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.ReviewId,
        });
      }
      return res.status(500).send({
        message: "Error updating review with id " + req.params.ReviewId,
      });
    });
};

// Delete a review with the specified ReviewId in the request
exports.delete = (req, res) => {
  Reviews.findByIdAndRemove(req.params.ReviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.ReviewId,
        });
      }
      res.send({ message: "Reviews deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.ReviewId,
        });
      }
      return res.status(500).send({
        message: "Could not delete review with id " + req.params.ReviewId,
      });
    });
};
