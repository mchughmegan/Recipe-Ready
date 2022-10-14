let searchResults;

// Gets the list of recipes based on search query and type
function searchApi(query, type) {
  let apiKey = `e5bf7e56648645d68a33119e2fe6fb01`;
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

// Gets the details for each recpie
function cardDetails(recipeId) {
  let apiKey = `e5bf7e56648645d68a33119e2fe6fb01`;
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

function nutritionDropdown(foodName) {
  let apiKey = `FNoYwq7dZIli0B7b/T6xGA==3sE2Q0jrARvb5osc`;
  let nutrientUrl = `https://api.calorieninjas.com/v1/nutrition?query=${foodName}`;
  if ($(`dropdown-${foodName}`).children() > 0) {
    return;
  } else {
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
        $(`#dropdown-${foodName}-content`).append(
          $("<div>")
            .addClass("dropdown-item")
            .append($("<p>").text(`Calories: ${data.items[0].calories}`))
            .append($("<hr>").addClass("dropdown-divider"))
            .append(
              $("<p>").text(
                `Carbohydrates (g): ${data.items[0].carbohydrates_total_g}`
              )
            )
            .append($("<hr>").addClass("dropdown-divider"))
            .append(
              $("<p>").text(`Cholesterol (mg): ${data.items[0].cholesterol_mg}`)
            )
            .append($("<hr>").addClass("dropdown-divider"))
            .append(
              $("<p>").text(
                `Saturated Fat (g): ${data.items[0].fat_saturated_g}`
              )
            )
            .append($("<hr>").addClass("dropdown-divider"))
            .append(
              $("<p>").text(`Total Fat (g): ${data.items[0].fat_total_g}`)
            )
            .append($("<hr>").addClass("dropdown-divider"))
            .append($("<p>").text(`Fiber (g): ${data.items[0].fiber_g}`))
            .append($("<hr>").addClass("dropdown-divider"))
            .append(
              $("<p>").text(`Potassium (mg): ${data.items[0].potassium_mg}`)
            )
            .append($("<hr>").addClass("dropdown-divider"))
            .append($("<p>").text(`Protein (g): ${data.items[0].protein_g}`))
            .append($("<hr>").addClass("dropdown-divider"))
            .append($("<p>").text(`Sugar (g): ${data.items[0].sugar_g}`))
            .append($("<hr>").addClass("dropdown-divider"))
            .append($("<p>").text(`Sodium (mg): ${data.items[0].sodium_mg}`))
        );
      });
  }
}

function addIngredients(recipeId) {
  $("#modal-recipe-ingredients").empty();
  for (let i = 0; i < searchResults[recipeId].extendedIngredients.length; i++) {
    $("#modal-recipe-ingredients").append(
      $("<div>")
        .addClass("dropdown")
        .attr(
          "id",
          `dropdown-${searchResults[recipeId].extendedIngredients[i].name}`
        )
        .append(
          $("<div>")
            .addClass("dropdown-trigger")
            .append(
              $("<button>")
                .addClass("button px-5 ingredient-dropdown-button")
                .attr(
                  "id",
                  `${searchResults[recipeId].extendedIngredients[i].name}`
                )
                .attr("aria-haspopup", "true")
                .attr("aria-controls", "dropdown-menu2")
                .append(
                  $("<span>")
                    .addClass("has-text-left")
                    .text(searchResults[recipeId].extendedIngredients[i].name)
                )
                .append(
                  $("<span>")
                    .addClass("material-symbols-outlined has-text-right")
                    .text("arrow_drop_down")
                )
            )
        )
        .append(
          $("<div>")
            .addClass("dropdown-menu")
            .attr("id", "dropdown-menu-2")
            .attr("role", "menu")
            .append(
              $("<div>")
                .addClass("dropdown-content")
                .attr(
                  "id",
                  `dropdown-${searchResults[recipeId].extendedIngredients[i].name}-content`
                )
            )
        )
    );
  }
}

function createRecipeModal(recipeId) {
  $("#recipe-modal").addClass("is-active");
  $("#recipe-title").text(`${searchResults[recipeId].title}`);
  $("#modal-recipe-description").html(`${searchResults[recipeId].summary}`);
  $("#modal-recipe-img").attr("src", `${searchResults[recipeId].image}`);
  $("#modal-recipe-instructions").html(
    `${searchResults[recipeId].instructions}`
  );
  addIngredients(recipeId);
}

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  searchApi($("#recipeQuery").val(), $("#dropdownOption").val());
  console.log($("#recipeQuery").val());
  setTimeout(function () {
    document.getElementById("recipe-results").scrollIntoView();
  }, 1000);
});

$("#close-modal").on("click", function () {
  $("#recipe-modal").removeClass("is-active");
});

$(document).on("click", ".recipe-page-button", function (event) {
  event.preventDefault();
  createRecipeModal(this.id);
});

$(document).on("click", ".ingredient-dropdown-button", function (event) {
  event.preventDefault();
  if ($(`#dropdown-${this.id}`).hasClass("is-active")) {
    $(`#dropdown-${this.id}`).removeClass("is-active");
  } else {
    $(`#dropdown-${this.id}`).addClass("is-active");
    nutritionDropdown(this.id);
  }
  console.log("dropdown clicked");
});
