var apiKey = "74ced1ca80754924bb27377f1e6099c9";
var button = document.getElementById("generate");
var now = dayjs();
var dtStamp = now.format("YYYYMMDD");
var dietType = "";
var difficultyLevel = "";
var cuisineType = "";
var newcocktail = [];

function setPageActions(event) {
  event.preventDefault();
  let page = document.body.id;
  switch (page) {
    case "Welcome":
      // set variables for the buttons
      let cocktail = document.querySelector("#yes");
      let nodrink = document.querySelector("#no");
      //cuisine type button variables
      var italianBtn = document.querySelector("[data-cuisinetype='italian']");
      var mexicanBtn = document.querySelector("[data-cuisinetype='mexican']");
      var indianBtn = document.querySelector("[data-cuisinetype='indian']");
      // diet type button variables
      var vegetarianBtn = document.querySelector(
        "[data-diettype='vegetarian']"
      );
      var veganBtn = document.querySelector("[data-diettype='vegan']");
      var glutenFreeBtn = document.querySelector(
        "[data-diettype='gluten-free']"
      );
      // difficulty level button variables
      var easyBtn = document.querySelector("[data-difficultlevel='easy']");
      var mediumBtn = document.querySelector("[data-difficultlevel='medium']");
      var hardBtn = document.querySelector("[data-difficultlevel='hard']");
      // sets the cuisine type
      italianBtn.addEventListener("click", italian);
      mexicanBtn.addEventListener("click", mexican);
      indianBtn.addEventListener("click", indian);
      // sets the diet type
      vegetarianBtn.addEventListener("click", vegetarian);
      veganBtn.addEventListener("click", vegan);
      glutenFreeBtn.addEventListener("click", glutenfree);
      // sets difficulty level
      easyBtn.addEventListener("click", easybtn);
      mediumBtn.addEventListener("click", mediumbtn);
      hardBtn.addEventListener("click", hardbtn);
      // takes user to the next page
      button.addEventListener("click", nextpage);
      // event listeners for the cocktail buttons
      cocktail.addEventListener("click", getcocktail);
      nodrink.addEventListener("click", nococktail);
      console.log("You are on the index page.");
      break;

    case "calendar":
      var storedCocktail = localStorage.getItem("cocktail");
      // Append a random cocktail recipe to the page

      displayCaledar(event);
      console.log(storedCocktail);
      console.log("You are on the calendar page.");
      break;
    default:
      console.log("Unknown page.");
  }
}
function displayCaledar(event) {
  var storedCocktail = localStorage.getItem("cocktail");
  generateRecipe(event);
  if (storedCocktail && storedCocktail.length > 0) {
    appendRandomCocktailRecipe(event);
  }
}
function generateRecipe() {
  console.log("Hello");
  var urlRequest = `https://api.spoonacular.com/recipes/random?number=7&type=breakfast&cuisine=${cuisineType}&readyInMinutes=${difficultyLevel}&diet=${dietType}&apiKey=${apiKey}`;

  fetch(urlRequest, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      displayRecipe(data);
    });
}
function nextpage() {
  window.location.href = "calendar.html";
}
// functions for cuisine type
function italian(event) {
  event.preventDefault();
  console.log("italian");
  cuisineType = "Italian";
}
function mexican(event) {
  event.preventDefault();
  console.log("mexican");
  cuisineType = "Mexican";
}
function indian(event) {
  event.preventDefault();
  console.log("indian");
  cuisineType = "Indian";
}
// functions for diet type
function vegetarian(event) {
  event.preventDefault();
  console.log("vegetarian");
  dietType = "Vegetarian";
}
function vegan(event) {
  event.preventDefault();
  console.log("vegan");
  dietType = "Vegan";
}
function glutenfree(event) {
  event.preventDefault();
  console.log("gluten free");
  dietType = "GlutenFree";
}
// funtions for difficulty level
function easybtn(event) {
  event.preventDefault();
  console.log("20");
  difficultyLevel = "20";
}
function mediumbtn(event) {
  event.preventDefault();
  console.log("40");
  difficultyLevel = "45";
}
function hardbtn(event) {
  event.preventDefault();
  console.log("60");
  difficultyLevel = "60";
}

function displayRecipe(recipeObject) {
  var recipeContainerEl = document.getElementById("recipes");
  for (let i = 0; i < recipeObject.recipes.length; i++) {
    // create a div for each recipe card
    var cardEl = document.createElement("div");
    cardEl.className =
      "w-1/6 h-auto bg-gray-200 mx-1 px-5 flex flex-col gap-1 items-center mb-0 relative";
    // create a div for the date and add a data attribute for dtStamp
    var dateEl = document.createElement("p");
    dateEl.className = "text-lg font-bold mb-2";
    var dtStamp = now.add(i, "day").format("YYYYMMDD");
    dateEl.setAttribute("data-dtStamp", dtStamp);
    dateEl.innerText = now.add(i, "day").format("dddd MMMM D");

    // create a div for the recipe name and link to the recipe page
    var nameEl = document.createElement("h3");
    nameEl.className =
      "text-xl font-bold mt-2 mb-1 flex justify-center items-center";
    var recipeLink = recipeObject.recipes[i].spoonacularSourceUrl;
    var nameLink = document.createElement("a");
    nameLink.href = recipeLink;
    nameLink.innerText = recipeObject.recipes[i].title;
    nameLink.target = "_blank";
    nameEl.appendChild(nameLink);

    // create a div for the recipe summary
    var summaryEl = document.createElement("p");
    summaryEl.className = "text-sm mb-2";
    summaryEl.innerHTML = recipeObject.recipes[i].summary.split(".")[0] + ".";

    // create a div for the recipe prep time
    var prepEl = document.createElement("p");
    prepEl.className = "text-sm mb-2";
    prepEl.innerHTML = `Prep time: ${recipeObject.recipes[i].readyInMinutes} minutes`;

    // create a div for the recipe servings
    var servingsEl = document.createElement("p");
    servingsEl.className = "text-sm mb-2 pb-2";
    servingsEl.innerHTML = `Servings: ${recipeObject.recipes[i].servings}`;

    // create a button for adding to calendar
    var calendarBtn = document.createElement("button");
    calendarBtn.className =
      "py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 absolute bottom-0 mt-2";
    calendarBtn.innerText = "Add to calendar";

    // add event listener to button for adding to calendar
    calendarBtn.addEventListener("click", function () {
      var calendarSummary = `Today's recipe: ${nameLink.innerText}`;
      var calendarDescription = recipeLink;
      var testIcs = ` 
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:${dtStamp}
ORGANIZER;CN=DinnerDate:MAILTO:john.doe@example.com
DTSTART:${dtStamp}T170000
DTEND:${dtStamp}T180000
SUMMARY:${calendarSummary}
DESCRIPTION:${calendarDescription}
END:VEVENT
END:VCALENDAR`;

      var calendarBtnHref = document.createElement("a");
      calendarBtnHref.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(testIcs)
      );
      calendarBtnHref.setAttribute("download", "DinnerDate.ics");
      calendarBtnHref.click();
    });

    // append all elements to the recipe card div
    cardEl.appendChild(dateEl);
    cardEl.appendChild(nameEl);
    cardEl.appendChild(summaryEl);
    cardEl.appendChild(servingsEl);
    cardEl.appendChild(prepEl);
    cardEl.appendChild(calendarBtn);

    recipeContainerEl.appendChild(cardEl);
  }
}

// Josh .js
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
function appendRandomCocktailRecipe(event) {
  event.preventDefault();
  const apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(apiUrl)
    .then((response) => response.json())
    .then(({ drinks: [recipe] }) => {
      const ingredients = getIngredients(recipe);
      const recipeHtml = `
        <div class="h-2/6 w-auto bg-gray-200 mx-5 px-5 flex-col gap-1">
        <div class="grid grid-cols-2 gap-4">
        <div class="flex justify-end items-center">
        <img src="${recipe.strDrinkThumb}" alt="${recipe.strDrink}" class="object-fill max-h-64">
      </div>
      <div>
          <h2 class="text-lg font-bold mb-2">${recipe.strDrink}</h2>
            <h3 class="text-md font-bold">Ingredients:</h3>
            <ul class="text-sm mb-2 pb-2">${ingredients}</ul>
            <h3 class="text-md font-bold">Instructions:</h3>
            <p class="text-sm mb-2 pb-2">${recipe.strInstructions}</p>
          </div>
        </div>
      </div>
      `;
      document
        .querySelector("#drinkrecipe")
        .appendChild(
          document.createRange().createContextualFragment(recipeHtml)
        );
    });
}

window.addEventListener("load", setPageActions);
