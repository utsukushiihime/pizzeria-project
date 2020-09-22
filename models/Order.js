const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
  name: {type: String},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  pizza: {type: mongoose.Schema.Types.ObjectId, ref: "Pizza"},
}, 
{
  timestamps: true,
  createdAt: "createdAt",
}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;