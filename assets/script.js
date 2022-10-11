function searchApi(query, category) {
  let apiKey = `a696c5ce649c4449b5b6afa1f5454ca9`; // HIDE THIS LATER
  let recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${apiKey}`;

  if (category) {
    recipeUrl = `${recipeUrl}&type=${category}`;
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
        $("#recipe-results").text("No results.");
      } else {
        for (let i = 0; i < data.results.length; i++) {
          createCard(data.results[i]);
        }
      }
    });
}

function cardDetails(recipeId) {
  let apiKey = `a696c5ce649c4449b5b6afa1f5454ca9`; // HIDE THIS LATER
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
      $(`#${recipeId}`)
        .find("#calories")
        .text(`${data.nutrition.nutrients[0].amount} calories`);
      $(`#${recipeId}`)
        .find("#ingredients")
        .text(`${data.extendedIngredients.length()} ingredients`);
      console.log();
      $(`#${recipeId}`).find("#servings").text(`${data.servings} servings`);
      $(`#${recipeId}`).find("#diet").text(`${data.diets[0]} ingredients`);
      $(`#${recipeId}`).find("#price").text(`${data.pricePerServing}/serving`);
    });
}

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
      "column card-content is-flex is-flex-direction-column is-align-items-stretch m-4"
    )
    .append(
      $("<h3>").addClass("is-size-3 mt-1 pb-2").attr("id", "recipe-name")
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

searchApi("pizza");
