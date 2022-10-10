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
                  <span class="material-symbols-outlined icon">timer</span>
                  <p id="time">45 mins</p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">bolt</span>
                  <p id="calories">250 cal/serving</p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">egg</span>
                  <p id="ingredients">5 ingredients</p>
                </div>
              </div>
              <div
                class="column is-flex is-flex-direction-column is-justify-content-space-around"
              >
                <div class="card-item">
                  <span class="material-symbols-outlined icon"
                    >restaurant_menu</span
                  >
                  <p id="difficulty">Easy</p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon">set_meal</span>
                  <p id="diet">Vegetarian</p>
                </div>
                <div class="card-item">
                  <span class="material-symbols-outlined icon"
                    >shopping_cart</span
                  >
                  <p id="price">$10</p>
                </div>
              </div>
            </div>
          </div>
        </div>`;

array.forEach(element => {
    
});
$("#recipe-results").append(recipeCard);

