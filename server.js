/* External Modules */
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

// security
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
// logging
const morgan = require("mongoose-morgan");

/* Internal Modules */
const db = require("./models");
const controllers = require("./controllers");
const { notFound, methodNotAllowed } = require("./middleware/responseHandlers");
const authRequired = require("./middleware/authRequired");

/* Instanced Modules */
const app = express();

/* Configuration */

const corsOptions = {
  origin: ["https://planet-pizza.herokuapp.com/"], // ste url for live app
  optionsSuccesStatus: 200, // some legacy browsers will choke on status 204
};

app.use(cors(corsOptions));

// all use of .env
require("dotenv").config();

const PORT = process.env.PORT;

app.set("view engine", "ejs");

// rate limit set up
const LIMIT = rateLimit({
  max: 10000,
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  message: "Too many requests",
});

app.set("view engine", "ejs");

/* Middleware */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// use rate limiting
app.use(LIMIT);
// reset headers in response for security
app.use(helmet());
// sanitize data coming in from req.body
app.use(mongoSanitize());

// logging
const morganOptions = {
  connectionString: process.env.MONGODB_URI,
};
app.use(
  morgan(
    morganOptions,
    {
      // add this if you want to just track errors
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    },
    "dev"
  )
);

// sessions
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
    }),
    cookie: {
      // milliseconds
      // 1000 (one second) * 60 (one minute) * 60 (one hour) * 24 (one day) * 7 (one week) * 2
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
    },
  })
);

// middleware to add user to all ejs views
app.use(function (req, res, next) {
  res.locals.user = req.session.currentUser; // adds the user to all ejs views
  next();
});

/* Routes */

// view routes
app.get("/", function (req, res) {
  // render("file", context)
  res.render("index");
});
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

// response middleware
app.get("/*", notFound);
app.use(methodNotAllowed);

/* Server Listener */
app.listen(PORT, function () {
  console.log(`Server is live and listening at ${PORT}`);
});
