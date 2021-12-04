// Imports
const express = require("express");
const path = require("path");

// Initializations
const app = express();
const port = 5000;

// Middlewares
app.use("/", require(path.join(__dirname, "routes/google-rating.js")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from MovieHunt!");
});

// Listening
app.listen(port, () => {
  console.log(`MovieHunt Backend listening at port ${port}`);
});
