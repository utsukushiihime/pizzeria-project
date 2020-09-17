/* External Modules */
const express = require("express");
const methodOverride = require("method-override");

/* Internal Modules */
const db = require("./models");
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();

/* Configuration */
const PORT = 3000;

app.set("view engine", "ejs");

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Routes */
app.get("/", (req, res) => {
  res.send("index");
});

/* Server Listener */
app.listen(PORT, () => {
  console.log(`Listening for client request on port ${PORT}`);
});
