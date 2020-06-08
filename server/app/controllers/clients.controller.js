const Clients = require("../models/clients.model.js");

// Create and Save a new Clients
exports.create = (req, res) => {
  // Create a Clients
  const client = new Clients({
    phone: req.body.phone,
    name: req.body.name,
    surname: req.body.surname,
    patronymic: req.body.patronymic,
    email: req.body.email,
  });

  // Save Clients in the database
  client
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Clients.",
      });
    });
};

// Retrieve and return all clients from the database.
exports.findAll = (req, res) => {
  Clients.find()
    .then((clients) => {
      res.send(clients);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients.",
      });
    });
};

// Find a single client with a clientId
exports.findOne = (req, res) => {
  Clients.findById(req.params.clientId)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.clientId,
        });
      }
      res.send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.clientId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving client with id " + req.params.clientId,
      });
    });
};

// Update a client identified by the clientId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Clients content can not be empty",
    });
  }

  // Find client and update it with the request body
  Clients.findByIdAndUpdate(
    req.params.clientId,
    {
      title: req.body.title || "Untitled Clients",
      content: req.body.content,
    },
    { new: true }
  )
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.clientId,
        });
      }
      res.send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.clientId,
        });
      }
      return res.status(500).send({
        message: "Error updating client with id " + req.params.clientId,
      });
    });
};

// Delete a client with the specified clientId in the request
exports.delete = (req, res) => {
  Clients.findByIdAndRemove(req.params.clientId)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.clientId,
        });
      }
      res.send({ message: "Clients deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.clientId,
        });
      }
      return res.status(500).send({
        message: "Could not delete client with id " + req.params.clientId,
      });
    });
};
