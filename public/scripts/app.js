console.log("This is accessible");

// This works with EJS so I am leaving it until I find a better solution
$(document).ready(function () {
  $("select#size").change(function () {
    let sizeValues = $(this).children("option:selected").val();
    if (sizeValues === "Rocket Slice") {
      $("input:text").val("4");
    }
    alert("You have selected the size - " + sizeValues);
  });

  // if size selected === x then price
  // if Rocket Slice selected then price 4
  // if Rocket Slice selected then price 8
  // if Rocket Slice selected then price 12
  // if Rocket Slice selected then price 16
  // if Rocket Slice selected then price 21

  // if meat topping selected > 1 then add $1.50 per
  // if veggie toppings selected > 3 then add $0.50 per
  // add total of the values and push to price

  // FIXME Possible solution for detecting input change
  // $(document).on("change", "input", function () {});

  // Size Options
  const size = ["Rocket Slice", "Frisbee", "Moon", "Planet", "FSM"];

  for (let i = 0; i < size.length; i++) {
    $("#size").append(`<option value="${size[i]}">${size[i]} </option>`);
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
      `<option value="${toppingsMeat[i]}">${toppingsMeat[i]} </option>`
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
      `<option value="${toppingsVeggie[i]}">${toppingsVeggie[i]} </option>`
    );
  }
});
