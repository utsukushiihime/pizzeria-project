const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

// register form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// register post
router.post("/register", async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (foundUser) {
      return res.send({ message: "Account is already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;

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
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (!foundUser) {
      return res.send({ message: "Email or Password incorrect" });
    }
    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match) {
      return res.send({ message: "Email or Password incorrect" });
    }
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

// logout delete <- destroy session
router.delete("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
