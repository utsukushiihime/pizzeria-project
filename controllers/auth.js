const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

// register form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

// register post
router.get("/register", async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.emai });
    if (foundUser) {
      return res.send({ message: "Account already registered" });
    }

    //combat rainbow table attacks
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    // create user with req.body and hashed pass
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
router.get("/login", async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match) {
      return res.send({ message: "Email or Password incorrect" });

      // if passwords match, create session for authentication
      req.session.currentUser = {
        username: foundUser.username,
        id: foundUser._id,
      };

      // redirect to home
      res.redirect("/");
    }
  } catch (error) {
    res.send({ message: "Internal Server Error", err: error });
  }
});

// logout delete - destory session
router.delete("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
