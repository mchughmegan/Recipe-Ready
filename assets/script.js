// Gets the list of recipes based on search query and type
function searchApi(query, type) {
  let apiKey = `bb44c277222941bb9693b73540f82a99`; // HIDE THIS LATER
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
        for (let i = 0; i < data.results.length; i++) {
          createCard(data.results[i]);
        }
      }
    });
}

//search input and categories function

// Gets the details for each recpie
function cardDetails(recipeId) {
  let apiKey = `bb44c277222941bb9693b73540f82a99`; // HIDE THIS LATER
  console.log("Card Created");
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
      var readyInMinutes = `${data.readyInMinutes}`;
      $(`#${recipeId}-card`)
        .find("#time")
        .text(readyInMinutes + ` min`);
      var roundedCalories = `${data.nutrition.nutrients[0].amount}`;
      $(`#${recipeId}-card`)
        .find("#calories")
        .text(Math.round(roundedCalories) + ` calories`);
      var ingredients = `${data.extendedIngredients.length}`;
      $(`#${recipeId}-card`)
        .find("#ingredients")
        .text(ingredients + ` ingredients`);
      var servings = `${data.servings}`;
      $(`#${recipeId}-card`)
        .find("#servings")
        .text(servings + ` servings`);
      var diets = `${data.diets[0]}`;
      if (data.diets[0]) {
        $(`#${recipeId}-card`).find("#diet").text(diets);
      } else {
        $(`#${recipeId}-card`).find("#diet").text(`none`);
      }
      var roundedPrice = `${data.pricePerServing}`;
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
      .addClass("is-flex is-flex-direction-row is-justify-content-end btn is-link recipe-page-button")
      .attr("id", resultObj.id)
      .append(
        $("<span>").addClass("material-symbols-outlined p-2").text("open_in_full")
      )
  );
}

// Function to parse through ingredient array and create a list item
function addIngredient(ingredientName) {
  $("<div>")
    .addClass("is-flex is-flex-direction-row is-align-items-center")
    .append(
      $("<li>")
        .attr("id", `ingredient-name`)
        .addClass("mr-2")
        .text(`${ingredientName}`)
    )
    .append(
      $("<button>")
        .attr("id", "nutrition-button")
        .addClass("button is-rounded is-narrow is-info p-1 is-small")
        .append($("<span>").addClass("material-symbols-outlined").text("info"))
    );
}

function addRecipeStep(recipeStep) {
  $("<div>")
    .addClass("is-flex is-flex-direction-row is-align-items-center")
    .append(
      $("<li>")
        .attr("id", `recipe-step`)
        .addClass("mr-2")
        .text(`${recipeStep}`)
    )
}

// Calls the recipe api, then saves the necessary information to local storage to that it can be loaded on to the recipe page.
function loadRecipePage(recipeId) {
  let apiKey = `bb44c277222941bb9693b73540f82a99`; // HIDE THIS LATER
  console.log("Card Created");
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
      // Stores the summary into the local storage variable "recipe-description"
      localStorage.setItem("recipe-image", data.image)
      localStorage.setItem("recipe-name", data.title);
      localStorage.setItem("recipe-description", data.summary);
      let ingredientsList = []
      for (let i = 1; i < data.extendedIngredients.length; i++) {
        ingredientsList[i] = ingredientsList + data.extendedIngredients[i].name;
      }
      localStorage.setItem("ingredients-list", ingredientsList);
      localStorage.setItem("steps-list", data.instructions);
    });
}


// function recipeDetails(recipeId) {
//   let apiKey = `778cebdae1dd400dbf0229850f641b4b`; // HIDE THIS LATER
//   console.log("Recipe Created");
//   let detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?&apiKey=${apiKey}&includeNutrition=true`;
//   $(`#recipe-page`).empty();
//   fetch(detailsUrl, {
//     method: "GET",
//   })
//     .then(function (response) {
//       if (!response.ok) {
//         throw response.json();
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       var readyInMinutes = `${data.readyInMinutes}`;
//       $(`#${recipeId}`)
//         .find("#time")
//         .text(readyInMinutes + ` min`);
//       var roundedCalories = `${data.nutrition.nutrients[0].amount}`;
//       $(`#${recipeId}`)
//         .find("#calories")
//         .text(Math.round(roundedCalories) + ` calories`);
//       var ingredients = `${data.extendedIngredients.length}`;
//       $(`#${recipeId}`)
//         .find("#ingredients")
//         .text(ingredients + ` ingredients`);
//       var servings = `${data.servings}`;
//       $(`#${recipeId}`)
//         .find("#servings")
//         .text(servings + ` servings`);
//       var diets = `${data.diets[0]}`;
//       if (data.diets[0]) {
//         $(`#${recipeId}`).find("#diet").text(diets);
//       } else {
//         $(`#${recipeId}`).find("#diet").text(`none`);
//       }
//       var roundedPrice = `${data.pricePerServing}`;
//       $(`#${recipeId}`)
//         .find("#price")
//         .text(`$` + Math.ceil(roundedPrice / 100) + `/serving`);
//     })
//     .then(createRecipe);

//   function createRecipe(resultObj) {
//     console.log(resultObj);
//     let recipePage = $("<div>")
//       .addClass("recipe card")
//       .attr("id", resultObj.id);
//     let recipePageColumns = $("<div>").addClass("columns");
//     recipePage.append(cardColumns);
//     let image = $("<div>")
//       .addClass("column lg-recipe-img")
//       .append(
//         $("<img>").attr("id", "lg-recipe-img").addClass("lg-recipe-image")
//       );
//     recipePageColumns.append(image);
//     let recipeContent = $("<div>")
//       .addClass("column card-content is-flex is-flex-direction-column m-4")
//       .append(
//         $("<div>")
//           .addClass("is-size-4 mt-1 pb-2 recipe-name-box")
//           .attr("id", "recipe-title")
//       );
//     let recipeColumns = $("<div>").addClass("columns mt-2 item-box mb-2");
//     recipeColumns.append(
//       $("<div>")
//         .addClass(
//           "column is-flex is-flex-direction-column is-justify-content-space-around is-narrow"
//         )
//         .append(
//           $("<div>")
//             .addClass("card-item")
//             .append(
//               $("<span>").addClass("material-symbols-outlined").text("timer")
//             )
//             .append($("<p>").attr("id", "time"))
//         )
//         .append(
//           $("<div>")
//             .addClass("card-item")
//             .append(
//               $("<span>").addClass("material-symbols-outlined").text("bolt")
//             )
//             .append($("<p>").attr("id", "calories"))
//         )
//         .append(
//           $("<div>")
//             .addClass("card-item")
//             .append(
//               $("<span>").addClass("material-symbols-outlined").text("egg")
//             )
//             .append($("<p>").attr("id", "ingredients"))
//         )
//     );
//     recipeColumns.append(
//       $("<div>")
//         .addClass("")
//         .append(
//           $("<div>")
//             .addClass("card-item")
//             .append(
//               $("<span>")
//                 .addClass("material-symbols-outlined")
//                 .text("restaurant_menu")
//             )
//             .append($("<p>").attr("id", "servings"))
//         )
//         .append(
//           $("<div>")
//             .addClass("card-item")
//             .append(
//               $("<span>").addClass("material-symbols-outlined").text("set_meal")
//             )
//             .append($("<p>").attr("id", "diet"))
//         )
//         .append(
//           $("<div>")
//             .addClass("card-item")
//             .append(
//               $("<span>")
//                 .addClass("material-symbols-outlined")
//                 .text("shopping_cart")
//             )
//             .append($("<p>").attr("id", "price"))
//         )
//     );
//     recipeContent.append(recipeColumns);
//     recipePageColumns.append(recipeContent);
//     $(`#recipe-page`).append(recipeResult);
//     $(`#${resultObj.id}`).find("#recipe-name").text(`${resultObj.title}`);
//     $(`#${resultObj.id}`).find("#lg-recipe-img").attr("src", resultObj.image);
//     recipeDetails(resultObj.id);
//   }

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
  }, 1500);
});

$("#nutrition-button").on("click", function (event) {
  event.preventDefault();
  $("#nutrient-modal").addClass("is-active");
  nutritionInfo($("#nutrition-button").siblings("#ingredient-name").text());
});

$("#close-modal").on("click", function () {
  $("#nutrient-modal").removeClass("is-active");
});

// Call this to debug the load recipe page function
// loadRecipePage(640636);

// Testing the implementation of local storage into the recipe page
$("#recipe-description").html(localStorage.getItem("recipe-description"));

$("button").click(function () {
  // loadRecipePage($());
  // need help here with getting id of clicked button
  console.log(this.id);
  console.log("button pressed");
  console.log($(this).attr('id'));
});