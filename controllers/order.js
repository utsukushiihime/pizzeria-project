const express = require("express");
const router = express.Router();
// const router = require("express").Router()

const db = require("../models");

// base route is /orders

// index view /orders
router.get("/", async function (req, res) {
  try {
    const foundOrders = await db.Order.find({});
    const context = {
      orders: foundOrders,
    };
    res.render("order/index", context);
  } catch (error) {
    console.log(error);
    res.send({ message: "Internal Server Error" });
  }
});

// new
router.get("/new", function (req, res) {
  res.render("order/new");
});

// create
router.post("/", function (req, res) {
  //mongoose
  db.Order.create(req.body, function (err, createdOrder) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect("/orders");
  });
});

// show
router.get("/:id", function (req, res) {
  db.Order.findById(req.params.id, function (err, foundOrder) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { order: foundOrder };
    res.render("order/show", context);
  });
});

// edit <- view
router.get("/:id/edit", function (req, res) {
  db.Order.findById(req.params.id, function (err, foundOrder) {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    const context = { order: foundOrder };
    res.render("order/edit", context);
  });
});

// update <- db change
router.put("/:id", function (req, res) {
  db.Order.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err,
    updatedOrder
  ) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    res.redirect(`/orders/${updatedOrder._id}`);
  });
});

// delete
router.delete("/:id", function (req, res) {
  db.Order.findByIdAndDelete(req.params.id, function (err, deletedOrder) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    db.Order.remove({ order: deletedOrder._id }, function (err, removedOrder) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.redirect("/orders");
    });
  });
});

module.exports = router;
