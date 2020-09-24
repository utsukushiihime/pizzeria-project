console.log("This is accessible");

// This works with EJS so I am leaving it until I find a better solution
$(document).ready(function () {
  // Pizza Price
  $('input[name="price"]').val("15");

  // Crust Options
  const crust = [
    "Nano-Thin",
    "Standard Terran",
    "Deep Impact",
    "Cheesy Googlers",
    "Gluten Free",
  ];

  for (let i = 0; i < crust.length; i++) {
    $("#crust").append(`<option value="${crust[i]}">${crust[i]} </option>`);
  }

  // Sauce Options
  const sauce = [
    "Classic Marinara",
    "Garlic Parmesan",
    "Duck Sauce",
    "Mustard",
    "No Sauce",
  ];

  for (let i = 0; i < sauce.length; i++) {
    $("#sauce").append(`<option value="${sauce[i]}">${sauce[i]} </option>`);
  }

  // Cheese Options
  const cheese = [
    "Humble Cheddar",
    "Pure Parmesan",
    "Blended Mix",
    "Aorta Special",
    "None",
  ];

  for (let i = 0; i < cheese.length; i++) {
    $("#cheese").append(`<option value="${cheese[i]}">${cheese[i]} </option>`);
  }
});
