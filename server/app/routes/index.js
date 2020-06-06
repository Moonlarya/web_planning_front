module.exports.setUpRouter = (app) => {
  require("./client.routes.js")(app);
  require("./criterias.routes.js")(app);
  require("./grades.routes.js")(app);
  require("./employees.routes.js")(app);
  require("./positions.routes.js")(app);
  require("./projects.routes.js")(app);
  require("./reports.routes.js")(app);
  require("./reviews.routes.js")(app);
  require("./salaries.routes.js")(app);
  require("./tasks.routes.js")(app);
  require("./calendar.routes.js")(app);
};
