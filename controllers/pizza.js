const express = require("express");
const router = express.Router();

const db = require("../models");

// base route is /pizzas

// index
router.get("/", function (req, res) {
  db.Pizza.find({}, function (error, foundPizzas) {
    if (error) return res.send(error);

    const context = {
      Pizzas: foundPizzas,
    };

    res.render("pizza/index", context);
  });
});

// new
router.get("/new", function (req, res) {
  db.Order.find({}, function (err, foundOrders) {
    if (err) return res.send(err);

    const context = {
      Orders: foundOrders,
    };

    res.render("pizza/new", context);
  });
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
  db.Pizza.findById(req.params.id, function (err, foundPizza) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { pizza: foundPizza };
    res.render("pizza/show", context);
  });
});

// edit
router.get("/:id/edit", function (req, res) {
  db.Pizza.findById(req.params.id, function (err, foundPizza) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { pizza: foundPizza };
    res.render("pizza/edit", context);
  });
});

// update
router.put("/:id", function (req, res) {
  db.Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err,
    updatedPizza
  ) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.redirect(`/pizzas/${updatedPizza._id}`);
  });
});

// delete
router.delete("/:id", function (req, res) {
  db.Pizza.findByIdAndDelete(req.params.id, function (err, deletedPizza) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    db.Order.findById(deletedPizza.Order, function (err, foundOrder) {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      foundOrder.Pizzas.remove(deletedPizza);
      foundOrder.save();

      res.redirect("/pizzas");
    });
  });
});

module.exports = router;
