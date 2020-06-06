const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

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
//

require("./app/routes").setUpRouter(app);

const webBuildFolderName = "build";
app.use(express.static(webBuildFolderName));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, `../${webBuildFolderName}`, "index.html")
  );
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is listening on port" + port);
});
