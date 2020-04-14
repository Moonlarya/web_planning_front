const Clients = require("../models/clients.model.js");

// Create and Save a new Clients
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Client content can not be empty",
    });
  }

  // Create a Clients
  const client = new Clients({
    /*
      ClientPhone: { type: Number, required: true },
      ClientName: { type: String, required: true },
      ClientEmail: String,
     */
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

// Find a single client with a ClientId
exports.findOne = (req, res) => {
  Clients.findById(req.params.ClientId)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.ClientId,
        });
      }
      res.send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.ClientId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving client with id " + req.params.ClientId,
      });
    });
};

// Update a client identified by the ClientId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Clients content can not be empty",
    });
  }

  // Find client and update it with the request body
  Clients.findByIdAndUpdate(
    req.params.ClientId,
    {
      title: req.body.title || "Untitled Clients",
      content: req.body.content,
    },
    { new: true }
  )
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.ClientId,
        });
      }
      res.send(client);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.ClientId,
        });
      }
      return res.status(500).send({
        message: "Error updating client with id " + req.params.ClientId,
      });
    });
};

// Delete a client with the specified ClientId in the request
exports.delete = (req, res) => {
  Clients.findByIdAndRemove(req.params.ClientId)
    .then((client) => {
      if (!client) {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.ClientId,
        });
      }
      res.send({ message: "Clients deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Clients not found with id " + req.params.ClientId,
        });
      }
      return res.status(500).send({
        message: "Could not delete client with id " + req.params.ClientId,
      });
    });
};
