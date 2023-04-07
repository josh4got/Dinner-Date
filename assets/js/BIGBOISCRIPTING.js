let newcocktail = [];

function getcocktail(event) {
  event.preventDefault();
  let newEL = event.target.id;
  localStorage.setItem("cocktail", newEL);
  console.log(localStorage);
  console.log(newEL);
}
function nococktail(event) {
  event.preventDefault();
  localStorage.removeItem("cocktail");
  console.log("removed cocktail");
}

function getIngredients(recipe) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`<li>${measure} ${ingredient}</li>`);
    } else if (ingredient) {
      ingredients.push(`<li>${ingredient}</li>`);
    }
  }
  return ingredients.join("");
}

function appendRandomCocktailRecipe() {
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  fetch(apiUrl)
    .then((response) => response.json())
    .then(({ drinks: [recipe] }) => {
      const ingredients = getIngredients(recipe);
      const recipeHtml = `
        <div class="card h-24 vw-full flex m-5 p-3">
          <h2 class="card-title">${recipe.strDrink}</h2>
          <img src="${recipe.strDrinkThumb}" alt="${recipe.strDrink}" class="card-img">
          <div class="card-body">
            <h3 class="card-subtitle">Ingredients:</h3>
            <ul class="card-list">${ingredients}</ul>
            <h3 class="card-subtitle">Instructions:</h3>
            <p class="card-text">${recipe.strInstructions}</p>
          </div>
        </div>
      `;
      document
        .querySelector("#recipes")
        .appendChild(
          document.createRange().createContextualFragment(recipeHtml)
        );
    });
}

function setPageActions() {
  let page = document.body.id;
  switch (page) {
    case "Welcome":
      // Perform actions for the index page
      let cocktail = document.querySelector("#yes");
      let nodrink = document.querySelector("#no");
      cocktail.addEventListener("click", getcocktail);
      nodrink.addEventListener("click", nococktail);
      console.log("You are on the index page.");
      break;
    case "calendar":
      // Perform actions for the calendar page
      let storedCocktail = localStorage.getItem("cocktail");
      console.log(storedCocktail);
      if (storedCocktail && storedCocktail.length > 0) {
        appendRandomCocktailRecipe();
      }
      console.log("You are on the calendar page.");
      break;
    default:
      console.log("Unknown page.");
  }
}

window.addEventListener("load", setPageActions);
