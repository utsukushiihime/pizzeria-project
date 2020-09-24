const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    size: { type: String, required: true },

    crust: { type: String, required: true },

    sauce: { type: String, required: true },

    cheese: { type: String, required: true },

    toppingsMeat: [String],

    toppingsVeggie: [String],

    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
