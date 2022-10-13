// Gets the list of recipes based on search query and type
function searchApi(query, type) {
  let apiKey = `778cebdae1dd400dbf0229850f641b4b`; // HIDE THIS LATER
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
        $("#recipe-results").append($("<div>").addClass("conainer text-center m-auto pb-4 is-size-4 no-results").text("No results."));
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
  let apiKey = `778cebdae1dd400dbf0229850f641b4b`; // HIDE THIS LATER
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
      $(`#${recipeId}`).find("#time").text(`${data.readyInMinutes} min`);
      var roundedCalories = `${data.nutrition.nutrients[0].amount}`;
      $(`#${recipeId}`)
        .find("#calories")
        .text(Math.round(roundedCalories) + ` calories`);
      $(`#${recipeId}`)
        .find("#ingredients")
        .text(`${data.extendedIngredients.length} ingredients`);
      $(`#${recipeId}`).find("#servings").text(`${data.servings} servings`);
      if (data.diets[0]) {
        $(`#${recipeId}`).find("#diet").text(`${data.diets[0]}`);
      } else {
        $(`#${recipeId}`).find("#diet").text(`none`);
      }
      var roundedPrice = `${data.pricePerServing}`;
      $(`#${recipeId}`)
        .find("#price")
        .text(`$` + Math.ceil(roundedPrice / 100) + `/serving`);
    });
}

// Creates the cards based on each search object
function createCard(resultObj) {
  console.log(resultObj);
  let recipeResult = $("<div>")
    .addClass("recipe-card card my-5")
    .attr("id", resultObj.id);
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
  $(`#${resultObj.id}`).find("#recipe-name").text(`${resultObj.title}`);
  $(`#${resultObj.id}`).find("#recipe-img").attr("src", resultObj.image);
  cardDetails(resultObj.id);
}

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
      $("#nutrition-info").append($("<li>").text(data.items[0].calories)); // Creates a <li> element with the food's calories
    });
}

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  searchApi($("#recipeQuery").val(), $("#dropdownOption").val());
  console.log($("#recipeQuery").val())
  setTimeout(function () {
    document.getElementById("recipe-results").scrollIntoView();
  }, 1500);
});

$("#nutrition-button").on("click", function (event) {
  event.preventDefault();
  $("#nutrient-modal").addClass("is-active")
  nutritionInfo($("#nutrition-button").siblings("#ingredient-name").text());
});

$("#close-modal").on("click", function() {
  $("#nutrient-modal").removeClass("is-active")
})