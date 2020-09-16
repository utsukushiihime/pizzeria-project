const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Listening for client request on port ${PORT}`);
});
