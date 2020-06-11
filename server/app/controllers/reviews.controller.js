const Reviews = require("../models/reviews.model.js");
const Employees = require("../models/employees.model.js");

// Create and Save a new Reviews
exports.create = async (req, res) => {
  const email = req.body.email;
  const existUser = await Reviews.findOne({ email: email });
  if (existUser) {
    return res
      .status(500)
      .send({ message: "Review with this email already exists" });
  }
  // Create a Reviews
  const review = new Reviews({
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.patronymic,
    email: req.body.email,
    phone: req.body.phone,
    type: req.body.type,
    description: req.body.description,
    priority: req.body.priority,
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

// Find a single review with a reviewId
exports.findOne = (req, res) => {
  Reviews.findById(req.params.reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.reviewId,
        });
      }
      res.send(review);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.reviewId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving review with id " + req.params.reviewId,
      });
    });
};

exports.createEmployee = async (req, res) => {
  try {
    const review = await Reviews.findById(req.body.reviewId);
    const { name, email, phone, type, surname, patronymic } = review;
    const employee = new Employees({
      name,
      surname,
      patronymic,
      email,
      type,
      phone,
      status: "free",
    });
    const data = await employee.save();
    res.send(data);
    await review.delete();
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Reviews.",
    });
  }
};

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Reviews content can not be empty",
    });
  }

  // Find review and update it with the request body
  Reviews.findByIdAndUpdate(req.params.reviewId, req.body, { new: true })
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.reviewId,
        });
      }
      res.send(review);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.reviewId,
        });
      }
      return res.status(500).send({
        message: "Error updating review with id " + req.params.reviewId,
      });
    });
};

// Delete a review with the specified reviewId in the request
exports.delete = (req, res) => {
  Reviews.findByIdAndRemove(req.params.reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.reviewId,
        });
      }
      res.send({ message: "Reviews deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Reviews not found with id " + req.params.reviewId,
        });
      }
      return res.status(500).send({
        message: "Could not delete review with id " + req.params.reviewId,
      });
    });
};
