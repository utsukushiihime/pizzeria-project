const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

// base path /
// index view /users
router.get("/", async function (req, res) {
    try {
      const foundUsers = await db.User.find({});
      const context = {
        users: foundUsers,
      }
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
  router.post("/", function (req, res) {
    //mongoose
    db.User.create(req.body, function (err, createdUser) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
  
      res.redirect("/users");
    });
  });


// show
router.get("/:id", (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
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
    db.User.findById(req.params.id, (err, foundUser) => {
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
    db.User.findByIdAndUpdate(
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
