API_KEY = `fdd93af3e93f49288bba2c709b2f9f6a`; // HIDE THIS LATER
RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}`;



function printRecipeCards(resultObj) {
    let recipeCard =
    `<div class="recipe-card card my-5">
        <div class="columns">
          <div class="column is-one-third is-paddingless">
            <div class="card-image">
              <figure class="image is-2by3">
                <img
                  id="recipe-img"
                  src="./assets/images/card-placeholder.jpg"
                />
              </figure>
            </div>
          </div>
          <div
            class="column card-content is-flex is-flex-direction-column is-align-items-stretch m-4"
          >
            <h3 class="is-size-3 mt-1 pb-2">Yogurt Parfait</h3>
            <div class="columns mt-2 item-box mb-2">
              <div
                class="column is-flex is-flex-direction-column is-justify-content-space-around is-narrow"
              >
                <div class="card-item">
                  <span class="material-symbols-outlined icon">
                  </span>
                  <p id="time"></p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">
                  </span>
                  <p id="calories"></p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">
                  </span>
                  <p id="ingredients"></p>
                </div>
              </div>
              <div
                class="column is-flex is-flex-direction-column is-justify-content-space-around"
              >
                <div class="card-item">
                  <span class="material-symbols-outlined icon">
                  </span>
                  <p id="difficulty"></p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">
                  </span>
                  <p id="diet"></p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">
                  </span>
                  <p id="price">Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    
}




fetch(RECIPE_URL, {
    method: 'GET'
})
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
    })


let recipeResult = $("<div>").addClass("recipe-card card my-5");
let cardColumns = $("<div>").addClass("columns");
recipeResult.append(cardColumns);
let image = $("<div>").addClass("column is-one-third is-paddingless")
    .append($("<img>").attr("id", "recipe-img")
    .addClass("card-image")
    .attr("src", "./assets/images/card-placeholder.jpg"))
cardColumns.append(image);
let cardContent = $("<div>")
    .addClass("column card-content is-flex is-flex-direction-column is-align-items-stretch m-4")
let recipeName = $("<h3>").addClass("is-size-3 mt-1 pb-2").text("Recipe name");
cardContent.append(recipeName);
let itemColumns = $("<div>").addClass("columns mt-2 item-box mb-2");
let items = $("<div>")
    .addClass("column is-flex is-flex-direction-column is-justify-content-space-around is-narrow");
itemColumns.append(items
    .append(
        $("<div>").addClass("card-item")
        .append($("<span>").addClass("material-symbols-outlined").text("timer"))
        .append($("<p>").attr("id", "time"))
    )
    .append(
        $("<div>").addClass("card-item")
        .append($("<span>").addClass("material-symbols-outlined").text("bolt"))
        .append($("<p>").attr("id", "calories"))
    )
    .append(
        $("<div>").addClass("card-item")
        .append($("<span>").addClass("material-symbols-outlined").text("egg"))
        .append($("<p>").attr("id", "ingredients"))
    ));
itemColumns.append(items
    .append(
        $("<div>").addClass("card-item")
        .append($("<span>").addClass("material-symbols-outlined").text("restaurant_menu"))
        .append($("<p>").attr("id", "difficulty"))
    )
    .append(
        $("<div>").addClass("card-item")
        .append($("<span>").addClass("material-symbols-outlined").text("set_meal"))
        .append($("<p>").attr("id", "diet"))
    )
    .append(
        $("<div>").addClass("card-item")
        .append($("<span>").addClass("material-symbols-outlined").text("shopping_cart"))
        .append($("<p>").attr("id", "price"))
    ));



cardContent.append(itemColumns);
cardColumns.append(cardContent);
$("#recipe-results").append(recipeResult);

