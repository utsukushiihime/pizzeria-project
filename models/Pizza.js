const mongoose = require("mongoose");

// schema is the validation of our documents
const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    size: {
      type: String,
      enum: ["Rocket Slice", "Frisbee", "Moon", "Planet", "FSM"],
      // required: true,
    },
    crust: {
      type: String,
      enum: [
        "Nano-Thin",
        "Standard Terran",
        "Deep Impact",
        "Cheesy Googlers",
        "Gluten Free",
      ],
      // required: true,
    },
    sauce: {
      type: String,
      enum: [
        "Classic Marinara",
        "Garlic Parmesan",
        "Duck Sauce",
        "Mustard",
        "No Sauce",
      ],
      // required: true,
    },
    cheese: {
      type: String,
      enum: [
        "Humble Cheddar",
        "Pure Parmesan",
        "Blended Mix",
        "Aorta Special",
        "None",
      ],
      // required: true,
    },
    toppingsMeat: {
      type: String,
      enum: [
        "Pepperoni",
        "Italian Sausage",
        "Ham",
        "Canadian Bacon",
        "American Bacon",
        "Grilled Chicken",
        "Tofu",
        "Crispy Crickets",
        "Shredded Ostrich",
        "One Massive Meatball",
        "None",
      ],
      // required: true,
    },
    toppingsVeggie: {
      type: String,
      enum: [
        "Pineapple",
        "Mushrooms",
        "Banana Peppers",
        "Jalapeñoface Peppers",
        "Black Olives",
        "Red Onions",
        "Broccoli",
        "Hashbrowns",
        "Pumpkin",
        "Avacado",
        "None",
      ],
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
  }
);

// model is the direct connection to the collection
const Pizza = mongoose.model("Pizza", pizzaSchema);
// Verifying enum data
console.log(Pizza.schema.path("crust").enumValues);
console.log(Pizza.schema.path("sauce").enumValues);
console.log(Pizza.schema.path("cheese").enumValues);
console.log(Pizza.schema.path("toppingsMeat").enumValues);
console.log(Pizza.schema.path("toppingsVeggie").enumValues);

module.exports = Pizza;
