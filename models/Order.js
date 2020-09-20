const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({  
  orderId: { type: mongoose.SchemaTypes.ObjectId,

  required: true, index: true },  
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;