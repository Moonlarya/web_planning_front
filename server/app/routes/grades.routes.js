module.exports = (app) => {
  const grades = require("../controllers/grades.controller.js");

  // Create a new client
  app.post("/grades", grades.create);

  // Retrieve all grades
  app.get("/grades", grades.findAll);

  // Retrieve a single client with gradeId
  app.get("/grades/:gradeId", grades.findOne);

  // Update a client with gradeId
  app.put("/grades/:gradeId", grades.update);

  // Delete a client with gradeId
  app.delete("/grades/:gradeId", grades.delete);
};
