let searchResults;

// Gets the list of recipes based on search query and type
function searchApi(query, type) {
  let apiKey = `46e4c2b31cc8426cbeba641db940aaf6`;
  let recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${apiKey}`;
  $("#recipe-results").empty();
  console.log(`Searching for ${query} in the ${type} option.`);
  if (type) {
    recipeUrl = `${recipeUrl}&type=${type}`;
  }

  let searchUrl = `${recipeUrl}&query=${query}`;

  fetch(searchUrl, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      if (!data.results.length) {
        console.log("No results.");
        $("#recipe-results").append(
          $("<div>")
            .addClass("container text-center m-auto pb-4 is-size-4 no-results")
            .text("No results.")
        );
      } else {
        searchResults = {};
        for (let i = 0; i < data.results.length; i++) {
          createCard(data.results[i]);
        }
      }
    });
}

//search input and categories function

// Gets the details for each recpie
function cardDetails(recipeId) {
  let apiKey = `46e4c2b31cc8426cbeba641db940aaf6`;
  let detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?&apiKey=${apiKey}&includeNutrition=true`;
  fetch(detailsUrl, {
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      searchResults[recipeId] = data;
      var readyInMinutes = `${searchResults[recipeId].readyInMinutes}`;
      $(`#${recipeId}-card`)
        .find("#time")
        .text(readyInMinutes + ` min`);
      var roundedCalories = `${searchResults[recipeId].nutrition.nutrients[0].amount}`;
      $(`#${recipeId}-card`)
        .find("#calories")
        .text(Math.round(roundedCalories) + ` calories`);
      var ingredients = `${searchResults[recipeId].extendedIngredients.length}`;
      $(`#${recipeId}-card`)
        .find("#ingredients")
        .text(ingredients + ` ingredients`);
      var servings = `${searchResults[recipeId].servings}`;
      $(`#${recipeId}-card`)
        .find("#servings")
        .text(servings + ` servings`);
      var diets = `${searchResults[recipeId].diets[0]}`;
      if (searchResults[recipeId].diets[0]) {
        $(`#${recipeId}-card`).find("#diet").text(diets);
      } else {
        $(`#${recipeId}-card`).find("#diet").text(`none`);
      }
      var roundedPrice = `${searchResults[recipeId].pricePerServing}`;
      $(`#${recipeId}-card`)
        .find("#price")
        .text(`$` + Math.ceil(roundedPrice / 100) + `/serving`);
    });
}

// Creates the cards based on each search object
function createCard(resultObj) {
  console.log(resultObj);
  let recipeResult = $("<div>")
    .addClass("recipe-card card my-5")
    .attr("id", `${resultObj.id}-card`);
  let cardColumns = $("<div>").addClass("columns");
  recipeResult.append(cardColumns);
  let image = $("<div>")
    .addClass("column is-one-third is-paddingless")
    .append($("<img>").attr("id", "recipe-img").addClass("card-image"));
  cardColumns.append(image);
  let cardContent = $("<div>")
    .addClass(
      "column is-three-fifths card-content is-flex is-flex-direction-column m-4"
    )
    .append(
      $("<div>")
        .addClass("is-size-4 mt-1 pb-2 recipe-name-box")
        .attr("id", "recipe-name")
    );

  let itemColumns = $("<div>").addClass("columns mt-2 item-box mb-2");
  itemColumns.append(
    $("<div>")
      .addClass(
        "column is-flex is-flex-direction-column is-justify-content-space-around is-narrow"
      )
      .append(
        $("<div>")
          .addClass("card-item")
          .append(
            $("<span>").addClass("material-symbols-outlined").text("timer")
          )
          .append($("<p>").attr("id", "time"))
      )
      .append(
        $("<div>")
          .addClass("card-item")
          .append(
            $("<span>").addClass("material-symbols-outlined").text("bolt")
          )
          .append($("<p>").attr("id", "calories"))
      )
      .append(
        $("<div>")
          .addClass("card-item")
          .append($("<span>").addClass("material-symbols-outlined").text("egg"))
          .append($("<p>").attr("id", "ingredients"))
      )
  );
  itemColumns.append(
    $("<div>")
      .addClass(
        "column is-flex is-flex-direction-column is-justify-content-space-around is-narrow"
      )
      .append(
        $("<div>")
          .addClass("card-item")
          .append(
            $("<span>")
              .addClass("material-symbols-outlined")
              .text("restaurant_menu")
          )
          .append($("<p>").attr("id", "servings"))
      )
      .append(
        $("<div>")
          .addClass("card-item")
          .append(
            $("<span>").addClass("material-symbols-outlined").text("set_meal")
          )
          .append($("<p>").attr("id", "diet"))
      )
      .append(
        $("<div>")
          .addClass("card-item")
          .append(
            $("<span>")
              .addClass("material-symbols-outlined")
              .text("shopping_cart")
          )
          .append($("<p>").attr("id", "price"))
      )
  );
  cardContent.append(itemColumns);
  cardColumns.append(cardContent);
  $(`#recipe-results`).append(recipeResult);
  $(`#${resultObj.id}-card`).find("#recipe-name").text(resultObj.title);
  $(`#${resultObj.id}-card`).find("#recipe-img").attr("src", resultObj.image);
  cardDetails(resultObj.id);
  cardContent.append(
    $("<button>")
      .addClass(
        "is-flex is-flex-direction-row is-justify-content-end button is-warning recipe-page-button ml-auto p-0 is-rounded"
      )
      .attr("id", resultObj.id)
      .append(
        $("<span>")
          .addClass("material-symbols-outlined p-2")
          .text("open_in_full")
      )
  );
}

// Function to parse through ingredient array and create a list item
function addIngredients(recipeId) {
  let apiKey = `FNoYwq7dZIli0B7b/T6xGA==3sE2Q0jrARvb5osc`;
  let nutrientUrl = `https://api.calorieninjas.com/v1/nutrition?query=${foodName}`;
  fetch(nutrientUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      for (
        let i = 0;
        i < searchResults[recipeId].extendedIngredients.length;
        i++
      ) {
        $("#modal-recipe-ingredients").append(
          $("<div>")
            .addClass("dropdown")
            .append(
              $("<div>")
                .addClass("dropdown-trigger")
                .text(searchResults[recipeId].extendedIngredients[i].name)
                .append(
                  $("<button>")
                    .addClass("button")
                    .attr("aria-haspopup", "true")
                    .attr("aria-controls", "dropdown-menu2")
                    .append(
                      $("<span>")
                        .addClass("icon is-small")
                        .append(
                          $("<i>")
                            .addClass("fas fa-angle-down")
                            .attr("aria-hidden", "true")
                        )
                    )
                )
            )
            .append(
              $("<div")
                .addClass("dropdown-menu")
                .attr("id", "dropdown-menu-2")
                .attr("role", "menu")
                .append(
                  $("<div>")
                    .addClass("dropdown-content")
                    .append(
                      $("<div>")
                        .addClass("dropdown-item")
                        .append(
                          $("<p>").text(`Calories: ${data.items[0].calories}`)
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Carbohydrates (g): ${data.items[0].carbohydrates_total_g}`
                          )
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Cholesterol (mg): ${data.items[0].cholesterol_mg}`
                          )
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Saturated Fat (g): ${data.items[0].fat_saturated_g}`
                          )
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Total Fat (g): ${data.items[0].fat_total_g}`
                          )
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(`Fiber (g): ${data.items[0].fiber_g}`)
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Potassium (mg): ${data.items[0].potassium_mg}`
                          )
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Protein (g): ${data.items[0].protein_g}`
                          )
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(`Sugar (g): ${data.items[0].sugar_g}`)
                        )
                        .append($("<hr>").addClass("dropdown-divider"))
                        .append(
                          $("<p>").text(
                            `Sodium (mg): ${data.items[0].sodium_mg}`
                          )
                        )
                    )
                )
            )
        );
      }
    });
}

function createRecipeModal(recipeId) {
  $("#recipe-modal").addClass("is-active");
  $("#recipe-title").text(`${searchResults[recipeId].title}`);
  $("#modal-recipe-description").html(`${searchResults[recipeId].summary}`);
  $("#modal-recipe-img").attr("src", `${searchResults[recipeId].image}`);
  $("#modal-recipe-instructions").html(
    `${searchResults[recipeId].instructions}`
  );
  $("#recipe-title").text(`${searchResults[recipeId].title}`);
}

// Calls the recipe api, then saves the necessary information to local storage to that it can be loaded on to the recipe page.
// function loadRecipePage(recipeId) {
// let apiKey = `f8a45576084f4f37ab0ec30d9cb1358c`; // HIDE THIS LATER
// console.log("Card Created");
// let detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?&apiKey=${apiKey}&includeNutrition=true`;
// fetch(detailsUrl, {
//   method: "GET",
// })
//   .then(function (response) {
//     if (!response.ok) {
//       throw response.json();
//     }
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     localStorage.clear();
//     // Stores the summary into the local storage variable "recipe-description"
//     localStorage.setItem("recipe-image", data.image);
//     localStorage.setItem("recipe-name", data.title);
//     localStorage.setItem("recipe-description", data.summary);
//     let ingredientsList = [];
//     for (let i = 0; i < data.extendedIngredients.length; i++) {
//       ingredientsList.push(data.extendedIngredients[i].name);
//     }
//     localStorage.setItem("ingredients-list", ingredientsList);
//     localStorage.setItem("steps-list", data.instructions);
//   });
// }

// function goToRecipePage() {
//   // $("#recipe-title").empty();
//   // $("#recipe-description").empty();
//   // $("#lg-recipe-img").empty();
//   // $("#ingredients-list").empty();

//   $(document).find("#recipe-title").text(localStorage.getItem("recipe-name"));
//   // $("#recipe-description").html(localStorage.getItem("recipe-description"));
//   // $("#lg-recipe-img").attr("src", localStorage.getItem("recipe-image"));
//   // addIngredients(localStorage.getItem("ingredients-list"))
// }

function nutritionInfo(foodName) {
  let apiKey = `FNoYwq7dZIli0B7b/T6xGA==3sE2Q0jrARvb5osc`;
  let nutrientUrl = `https://api.calorieninjas.com/v1/nutrition?query=${foodName}`;
  fetch(nutrientUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#modal-title").text(
        `${$("#ingredient-name").text()} Nutrition information`
      );
      $("#cals").text(data.items[0].calories);
      $("#carbs").text(data.items[0].carbohydrates_total_g);
      $("#cholesterol").text(data.items[0].cholesterol_mg);
      $("#sat-fat").text(data.items[0].fat_saturated_g);
      $("#fat").text(data.items[0].fat_total_g);
      $("#fiber").text(data.items[0].fiber_g);
      $("#potassium").text(data.items[0].potassium_mg);
      $("#protein").text(data.items[0].protein_g);
      $("#sugar").text(data.items[0].sugar_g);
      $("#sodium").text(data.items[0].sodium_mg);
      console.log(data.items[0].calories);
    });
}

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  searchApi($("#recipeQuery").val(), $("#dropdownOption").val());
  console.log($("#recipeQuery").val());
  setTimeout(function () {
    document.getElementById("recipe-results").scrollIntoView();
  }, 1000);
});

// $("#nutrition-button").on("click", function (event) {
//   event.preventDefault();
//   $("#nutrient-modal").addClass("is-active");
//   nutritionInfo($("#nutrition-button").siblings("#ingredient-name").text());
// });

$("#close-modal").on("click", function () {
  $("#recipe-modal").removeClass("is-active");
});

$(document).on("click", ".recipe-page-button", function (event) {
  event.preventDefault();
  createRecipeModal(this.id);
});
