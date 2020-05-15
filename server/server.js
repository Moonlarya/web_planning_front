const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://manager:gum20011968@cluster0-e5fus.mongodb.net/test"
);

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

require("./app/routes/client.routes.js")(app);
require("./app/routes/criterias.routes.js")(app);
require("./app/routes/grades.routes.js")(app);
require("./app/routes/interviews.routes.js")(app);
require("./app/routes/employees.routes.js")(app);
require("./app/routes/positions.routes.js")(app);
require("./app/routes/projects.routes.js")(app);
require("./app/routes/reports.routes.js")(app);
require("./app/routes/reviews.routes.js")(app);
require("./app/routes/salaries.routes.js")(app);
require("./app/routes/tasks.routes.js")(app);

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
