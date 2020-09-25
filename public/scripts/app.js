console.log("This is accessible");

// This works with EJS so I am leaving it until I find a better solution
$(document).ready(function () {
  // Size Pricing
  $("select#size").change(function () {
    // set price of item

    // set price by value selected
    let sizeValues = $(this).children("option:selected").val();

    if (sizeValues === "Rocket Slice") {
      let price = 8;
      let priceVal = parseInt(price);
      console.log(sizeValues, priceVal);
      $("input:hidden").val(`${priceVal}`);
    } else if (sizeValues === "Frisbee") {
      let price = 16;
      let priceVal = parseInt(price);
      console.log(sizeValues, priceVal);
      $("input:hidden").val(`${priceVal}`);
    } else if (sizeValues === "Moon") {
      let price = 24;
      let priceVal = parseInt(price);
      console.log(sizeValues, priceVal);
      $("input:hidden").val(`${priceVal}`);
    } else if (sizeValues === "Planet") {
      let price = 32;
      let priceVal = parseInt(price);
      console.log(sizeValues, priceVal);
      $("input:hidden").val(`${priceVal}`);
    } else if (sizeValues === "FSM") {
      let price = 45;
      let priceVal = parseInt(price);
      console.log(sizeValues, priceVal);
      $("input:hidden").val(`${priceVal}`);
    }
  });

  // Size Options
  const size = ["Rocket Slice", "Frisbee", "Moon", "Planet", "FSM"];

  for (let i = 0; i < size.length; i++) {
    $("#size").append(`<option value="${size[i]}">${size[i]}</option>`);
  }

  // Crust Options
  const crust = [
    "Nano-Thin",
    "Standard Terran",
    "Deep Impact",
    "Cheesy Googlers",
    "Gluten Free",
  ];

  for (let i = 0; i < crust.length; i++) {
    $("#crust").append(`<option value="${crust[i]}">${crust[i]}</option>`);
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
    $("#sauce").append(`<option value="${sauce[i]}">${sauce[i]}</option>`);
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
    $("#cheese").append(`<option value="${cheese[i]}">${cheese[i]}</option>`);
  }

  // Meat Toppings
  let toppingsMeat = [
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
  ];

  for (let i = 0; i < toppingsMeat.length; i++) {
    $("#toppingsMeat").append(
      `<option value="${toppingsMeat[i]}">${toppingsMeat[i]}</option>`
    );
  }

  // Veggie Toppings
  const toppingsVeggie = [
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
  ];

  for (let i = 0; i < toppingsVeggie.length; i++) {
    $("#toppingsVeggie").append(
      `<option value="${toppingsVeggie[i]}">${toppingsVeggie[i]}</option>`
    );
  }
});

// Dynamic pricing that has temporarily been put on the back-burnner
//  Size to $: 4, 8, 12, 16, 21
//     if $("#size")(`<option value ="${size[0]} </option>`);

//     $("").change(`$("#price")`)

// $("#size").change(function() {
//   $("#price").innerText(`${dynamicPriceText}`)
//   )}

//  itemID = document.getElementById("")
