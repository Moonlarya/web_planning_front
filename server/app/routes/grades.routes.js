const auth = require("../middlewares/auth");

module.exports = (app) => {
  const grades = require("../controllers/grades.controller.js");

  // Create a new client
  app.post("/api/grades", auth, grades.create);

  // Retrieve all grades
  app.get("/api/grades", auth, grades.findAll);

  // Retrieve a single client with gradeId
  app.get("/api/grades/:gradeId", auth, grades.findOne);

  // Update a client with gradeId
  app.put("/api/grades/:gradeId", auth, grades.update);

  // Delete a client with gradeId
  app.delete("/api/grades/:gradeId", auth, grades.delete);

  app.get("/api/grades/employee/:employeeId", auth, grades.findAllbyEmployee);
};
