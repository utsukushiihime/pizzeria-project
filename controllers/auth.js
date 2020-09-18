const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

// register form
router.get("/register", (req, res) => {
  res.render("auth/register");
});

module.exports = router;
