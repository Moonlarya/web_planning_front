const auth = require("../middlewares/auth");

module.exports = (app) => {
  const grades = require("../controllers/grades.controller.js");

  // Create a new client
  app.post("/grades", auth, grades.create);

  // Retrieve all grades
  app.get("/grades", auth, grades.findAll);

  // Retrieve a single client with gradeId
  app.get("/grades/:gradeId", auth, grades.findOne);

  // Update a client with gradeId
  app.put("/grades/:gradeId", auth, grades.update);

  // Delete a client with gradeId
  app.delete("/grades/:gradeId", auth, grades.delete);

  app.get("/grades/employee/:employeeId", auth, grades.findAllbyEmployee);
};
