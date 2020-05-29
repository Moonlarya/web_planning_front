const Calendar = require("../models/calendar.model.js");
const Review = require("../models/reviews.model.js");

// Create and Save a new calendars
exports.create = (req, res) => {
  console.log(req.body);
  // Create a calendars
  const calendar = new Calendar({
    employee: req.body.employee,
    review: req.body.review,
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    description: req.body.description,
  });

  // Save Calendar in the database
  calendar
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the calendars.",
      });
    });
};

// Retrieve and return all calendars from the database.
exports.findAll = (req, res) => {
  Calendar.find()
    .then((calendar) => {
      res.send(calendar);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving calendars.",
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const events = await Calendar.find().lean();
    const populatedEvents = await Promise.all(
      events.map(async (el) => {
        try {
          if (el.review) {
            const review = await Review.findById(el.review);
            return { ...el, review: review };
          } else {
            return el;
          }
        } catch (err) {
          console.log(err);
          return el;
        }
      })
    );
    res.send(populatedEvents);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

// Find a single calendar with a calendarId
exports.findOne = (req, res) => {
  Calendar.findById(req.params.calendarId)
    .then((calendar) => {
      if (!calendar) {
        return res.status(404).send({
          message: "calendar not found with id " + req.params.calendarId,
        });
      }
      res.send(calendar);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "calendar not found with id " + req.params.calendarId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving calendar with id " + req.params.calendarId,
      });
    });
};

// Update a calendar identified by the calendarId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "calendars content can not be empty",
    });
  }

  // Find calendar and update it with the request body
  Calendar.findByIdAndUpdate(
    req.params.calendarId,
    {
      title: req.body.title || "Untitled calendars",
      content: req.body.content,
    },
    { new: true }
  )
    .then((calendar) => {
      if (!calendar) {
        return res.status(404).send({
          message: "calendars not found with id " + req.params.calendarId,
        });
      }
      res.send(calendar);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "calendars not found with id " + req.params.calendarId,
        });
      }
      return res.status(500).send({
        message: "Error updating calendar with id " + req.params.calendarId,
      });
    });
};

// Delete a calendar with the specified calendarId in the request
exports.delete = (req, res) => {
  Calendar.findByIdAndRemove(req.params.calendarId)
    .then((calendar) => {
      if (!calendar) {
        return res.status(404).send({
          message: "calendars not found with id " + req.params.calendarId,
        });
      }
      res.send({ message: "calendars deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "calendars not found with id " + req.params.calendarId,
        });
      }
      return res.status(500).send({
        message: "Could not delete calendar with id " + req.params.calendarId,
      });
    });
};
