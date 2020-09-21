const mongoose = require('mongoose');

// schema is the validation of our documents
const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  crust: {
    type: String,
    required: true
  },
  sauce: {
    type: String,
    required: true
  },
  cheese: {
    type: String,
    required: true
  },
  toppings: {
    type: String,
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