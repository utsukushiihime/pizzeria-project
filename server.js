/* External Modules */
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

/* Internal Modules */
const db = require("./models");
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();

/* Configuration */
const PORT = 3000;

app.set("view engine", "ejs");

/* Middleware */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(methodOverride("_method"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "PlanetPizzaPizzeria",
    store: new MongoStore({
      url:
        "mongodb+srv://admin:n6QHsp438V4f8gK@planet-pizza.rauho.mongodb.net/pizzeria?retryWrites=true&w=majority/pizzeria-sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    },
  })
);

const authRequired = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

/* Routes */
// view routes
app.get("/", (req, res) => {
  res.render("index", { user: req.session.currentUser });
});

// Auth Routes
app.use("/", controllers.auth);

// User Routers
app.use("/user", controllers.user);

// Order Router
app.use("/orders", authRequired, controllers.order);

/* Server Listener */
app.listen(PORT, () => {
  console.log(`Listening for client request on port ${PORT}`);
});
