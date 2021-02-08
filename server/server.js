const express = require("express");
const app = express();
const path = require("path");
const apiRouter = require("./routes/route.js");
const bodyParser = require("body-parser");

//parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));

// handle anything for api
app.use("/api", apiRouter);

//handle get for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

//catch all
app.use((req, res) => res.sendStatus(404));

//Spin up server on port 3000
app.listen(3000);

//perhaps?
module.exports = app;
