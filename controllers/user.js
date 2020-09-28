const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, Order } = require("../models");

// index view /users
router.get("/", async function (req, res) {
  try {
    const foundUsers = await User.find({});

    const context = {
      users: foundUsers,
    };
    res.render("user/index", context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error" });
  }
});

// new
router.get("/new", function (req, res) {
  res.render("user/new");
});

// create
router.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect("/users");
  });
});

// show
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("orders")
    .exec((err, foundUser) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { user: foundUser };
      res.render("user/show", context);
    });
});

// edit <- view
router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { user: foundUser };
    res.render("user/edit", context);
  });
});

// update <- db change
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.redirect(`/user/${updatedUser._id}`);
    }
  );
});

module.exports = router;
