const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
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

orderSchema.pre("save", () => {
  console.log(this);
});

orderSchema.post("save", (doc, next) => {
  console.log(doc);
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
