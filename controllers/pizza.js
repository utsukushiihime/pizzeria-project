const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

// base path /
// index view /users
router.get("/", async function (req, res) {
    try {
      const foundPizza = await db.Pizza.find({});
      const context = {
        pizza: foundPizza,
      }
      res.render("pizza/index", context);
    } catch (error) {
      console.log(error);
      res.send({ message: "Internal Server Error" });
    }
  });
  
  // new
  router.get("/new", function (req, res) {
    res.render("pizza/new");
  });
  
  // create
  router.post("/", function (req, res) {
    //mongoose
    db.Pizza.create(req.body, function (err, createdPizza) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
  
      res.redirect("/pizza");
    });
  });


// show
router.get("/:id", function (req, res) {
  db.Pizza.findById(req.params.id)
    .populate("orders")
    .exec(function (err, found) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { user: foundPizza };
      res.render("pizza/show", context);
    });
});
  
  // edit <- view
  router.get("/:id/edit", (req, res) => {
    db.Pizza.findById(req.params.id, (err, foundPizza) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { pizza: foundPizza };
      res.render("pizza/edit", context);
    });
  });
  
  // update <- db change
  router.put("/:id", (req, res) => {
    db.Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedPizza) => {
        if (err) {
          console.log(err);
          return res.send(err);
        }
  
        res.redirect(`/pizza/${updatedPizza._id}`);
      }
    );
  });
  

module.exports = router;
