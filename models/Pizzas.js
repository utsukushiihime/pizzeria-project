const mongoose = require('mongoose');

// schema is the validation of our documents
const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: pizzaSize ["Rocket Slice", "Frisbee", "Moon", "Planet", "FSM"],
    required: true
  },
  crust: {
    type: pizzaCrust ["Nano-Thin", "Standard Terran", "Deep Impact", "Cheesy Googlers", "Gluten Free"],
    required: true
  },
  sauce: {
    type: pizzaSauce ["Classic Marinara", "Garlic Parmesan", "Duck Sauce", "Mustard", "No Sauce"],
    required: true
  },
  cheese: {
    type: pizzaCheese ["Humble Cheddar", "Pure Parmesan", "Specialty Mix", "Heart Attack Blend", "None"],
    required: true
  },
  toppingsMeat: {
    type: meatToppings["Pepperoni", "Italian Sausage", "Ham", "Canadian Bacon", "American Bacon", "Grilled Chicken", "Crispy Crickets", "Shredded Ostrich", "One Massive Meatball"],
    required: true
  },
  toppingsVeggie: {
    type: veggieToppings["Pineapple", "Mushrooms", "Banana Peppers", "Jalapeñoface Peppers", "Black Olives", "Red Onions", "Broccoli", "Hashbrowns", "Pumpkin", "Avacado"],
    required: true
  },
  price: {
    type: number,
    required: true
  },
},  
  { timestamps: true },

);

// model is the direct connection to the collection
const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;