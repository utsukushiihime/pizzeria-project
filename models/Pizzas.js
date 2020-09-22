const mongoose = require('mongoose');

// schema is the validation of our documents
const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ["Rocket Slice", "Frisbee", "Moon", "Planet", "FSM"],
    required: true
  },
  crust: {
    type: String,
    enum: ["Nano-Thin", "Standard Terran", "Deep Impact", "Cheesy Googlers", "Gluten Free"],
    required: true
  },
  sauce: {
    type: String,
    enum: ["Classic Marinara", "Garlic Parmesan", "Duck Sauce", "Mustard", "No Sauce"],
    required: true
  },
  cheese: {
    type: String,
    enum: ["Humble Cheddar", "Pure Parmesan", "Blended Mix", "Aorta Special", "None"],
    required: true
  },
  toppingsMeat: {
    type: String,
    enum: ["Pepperoni", "Italian Sausage", "Ham", "Canadian Bacon", "American Bacon", "Grilled Chicken", "Crispy Crickets", "Shredded Ostrich", "One Massive Meatball"],
    required: true
  },
  toppingsVeggie: {
    type: String,
    enum: ["Pineapple", "Mushrooms", "Banana Peppers", "Jalapeñoface Peppers", "Black Olives", "Red Onions", "Broccoli", "Hashbrowns", "Pumpkin", "Avacado"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
},  
  { timestamps: true },

);

// model is the direct connection to the collection
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;
