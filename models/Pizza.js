const mongoose = require("mongoose");

// schema is the validation of our documents
const pizzaSchema = new mongoose.Schema(
  {
    name: String,

    size: String,

    crust: String,

    sauce: String,

    cheese: String,

    toppingsMeat: String,

    toppingsVeggie: String,

    price: Number,
  },
  {
    timestamps: true,
    createdAt: "createdAt",
  }
);

// model is the direct connection to the collection
const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
