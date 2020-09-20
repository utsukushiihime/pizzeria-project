const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

// base path /

// register form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// register post
router.post("/register", async (req, res) => {
  try {
    // search db to see if user already exists (using email)
    const foundUser = await db.User.findOne({ email: req.body.email });
    // if a user is found, send back an error
    if (foundUser) {
      return res.send({ message: "Account is already registered" });
    }
    // if no user is found, hash password
    // combat rainbow table attacks
    const salt = await bcrypt.genSalt(10);
    // takes each character and turns it into multiple random characters
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    // create user with req.body and hashed password
    await db.User.create(req.body);

    // redirect to login
    res.redirect("/login");
  } catch (error) {
    res.send({ message: "Internal Server Error", err: error });
  }
});

// login form
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// login post <- authentication
router.post("/login", async (req, res) => {
  try {
    // see if the user exists (using email)
    const foundUser = await db.User.findOne({ email: req.body.email });
    // if they do not exist, send error
    if (!foundUser) {
      return res.send({ message: "Email or Password incorrect" });
    }
    // if they do exist, compare db password with entered password using bcrypt (return true/false)
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    // if passwords don't match, send error
    if (!match) {
      return res.send({ message: "Email or Password incorrect" });
    }
    // if passwords match, create sesssion for authentication
    req.session.currentUser = {
      username: foundUser.username,
      id: foundUser._id,
      email: foundUser.email,
      address: foundUser.address,
      city: foundUser.city,
      state: foundUser.state,
      zip: foundUser.zip,
      ccNum: foundUser.ccNum,
      ccv: foundUser.ccv,
      expiry: foundUser.expiry,
      orders: foundUser.orders,
    };

    // redirect to home
    res.redirect("/");
  } catch (error) {
    res.send({ message: "Internal Server Error", err: error });
  }
});

// show
router.get("/:id", (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { user: foundUser };
    res.render("auth/show", context);
  });
});

// edit <- view
router.get("/:id/edit", (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { user: foundUser };
    res.render("auth/edit", context);
  });
});

// update <- db change
router.put("/:id", (req, res) => {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.redirect(`/${updatedUser._id}`);
    }
  );
});

// logout delete <- destroy session
router.delete("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
