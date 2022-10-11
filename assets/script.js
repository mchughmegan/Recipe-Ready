API_KEY = `fdd93af3e93f49288bba2c709b2f9f6a`; // HIDE THIS LATER
RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?&apiKey=${API_KEY}`;


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
itemColumns.append($("<div>")
    .addClass("column is-flex is-flex-direction-column is-justify-content-space-around is-narrow")
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
itemColumns.append($("<div>")
    .addClass("column is-flex is-flex-direction-column is-justify-content-space-around is-narrow")
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
$("#time").text("test");
$("#calories").text("test");
$("#ingredients").text("test");
$("#difficulty").text("test");
$("#diet").text("test");
$("#price").text("test");
