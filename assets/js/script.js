var apiKey = "74ced1ca80754924bb27377f1e6099c9";
var button = document.getElementById("generate");
var now = dayjs();
var dtStamp = now.format("YYYYMMDD");
var dietType = "";
var difficultyLevel = "";
var cuisineType = "";
var newcocktail = [];
var cocktailName = ''
var cocktailInfo = ''

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
  var urlRequest = `https://api.spoonacular.com/recipes/random?number=7&tags=dinner&cuisine=${cuisineType}&readyInMinutes=${difficultyLevel}&diet=${dietType}&apiKey=${apiKey}`;

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
    
    var recipeContainerEl = document.getElementById('recipes');
    for (let i=0; i < recipeObject.recipes.length; i++){
        var cardEl2 = document.createElement('div');
    //   cardEl2.className = 'w-1/6 h-auto bg-gray-200 mx-1 px-5 flex flex-col gap-1 items-center mb-0 justify-between';
      // create a div for each recipe card
      var cardEl = document.createElement('div');
      cardEl.className = 'w-1/6 h-auto bg-white	rounded-md shadow-lg mx-1 px-5 flex flex-col gap-1 mb-0 justify-between';
      // create a div for the date and add a data attribute for dtStamp
      var dateEl = document.createElement('p');
      dateEl.className = 'text-med font-bold mb-2 mt-3 card-section';
      var dtStamp = now.add(i, 'day').format('YYYYMMDD');
      dateEl.setAttribute('data-dtStamp', dtStamp);
      dateEl.innerText = now.add(i, 'day').format('dddd MMMM D');
  
      // create a div for the recipe name and link to the recipe page
      var nameEl = document.createElement('h3');
      nameEl.className = 'text-xl font-bold mt-2 mb-1 flex card-section';
      var recipeLink = recipeObject.recipes[i].spoonacularSourceUrl;
      var nameLink = document.createElement('a');
      nameLink.href = recipeLink;
      nameLink.innerText = recipeObject.recipes[i].title;
      nameLink.target = '_blank';
      nameEl.appendChild(nameLink);
  
      // create a div for the recipe summary
      var summaryEl = document.createElement('p');
      summaryEl.className = 'text-sm mb-2 card-section';
      summaryEl.innerHTML = recipeObject.recipes[i].summary.split('.')[0] + '.';
  
      // create a div for the recipe prep time
      var prepEl = document.createElement('p');
      prepEl.className = 'text-sm mb-2 card-section';
      prepEl.innerHTML = `Prep time: ${recipeObject.recipes[i].readyInMinutes} minutes`;
  
      // create a div for the recipe servings
      var servingsEl = document.createElement('p');
      servingsEl.className = 'text-sm mb-2 pb-2 card-section';
      servingsEl.innerHTML = `Servings: ${recipeObject.recipes[i].servings}`;
  
      // create a button for adding to calendar
      var calendarBtn = document.createElement('button');
      calendarBtn.className = 'btn text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700';
      calendarBtn.innerText = 'Add to calendar';
      calendarBtn.setAttribute('data-dtstamp', dtStamp);
      calendarBtn.setAttribute('data-name', recipeLink);
      calendarBtn.setAttribute('data-title', nameLink.innerText);
      //calendarBtn.setAttribute('data-description', )
  
      // add event listener to button for adding to calendar
      calendarBtn.addEventListener("click", function(event) {
        //var calendarSummary = `Today's recipe: ${nameLink.innerText}`;
        //var calendarDescription = recipeLink;
        var recipeTitleCal = "Today's recipe: " + event.target.dataset.title;
        var recipeLinkCal = event.target.dataset.name;
        var buttonDtStamp = event.target.dataset.dtstamp;
        var fileName = "DinnerDate" + recipeTitleCal +".ics"
        var storedCocktail = localStorage.getItem("cocktail");
        if (storedCocktail) {
          //cocktailInfo.replace(/<li>/,'');
          recipeTitleCal = recipeTitleCal + " with " + cocktailName;
          recipeLinkCal = "Dinner recipe: " + recipeLinkCal + " Cocktail recipe: " + cocktailInfo; 
          // console.log(testIcs);
          //creates a unique user id for the ical invites
          function uuidv4() {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
              (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
          }
        }
var testIcs =` 
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${uuidv4()}.com
DTSTAMP:${buttonDtStamp}
ORGANIZER;CN=DinnerDate:MAILTO:john.doe@example.com
DTSTART:${buttonDtStamp}T170000
DTEND:${buttonDtStamp}T180000
SUMMARY:${recipeTitleCal}
DESCRIPTION:${recipeLinkCal}
END:VEVENT
END:VCALENDAR`;
  
        var calendarBtnHref = document.createElement('a');
        calendarBtnHref.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(testIcs));
        calendarBtnHref.setAttribute('download', fileName);
        calendarBtnHref.click();
      });
  
      // append all elements to the recipe card div
      cardEl2.appendChild(dateEl);
      cardEl2.appendChild(nameEl);
      cardEl2.appendChild(summaryEl);
      cardEl2.appendChild(servingsEl);
      cardEl2.appendChild(prepEl);

      cardEl.appendChild(cardEl2);
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
      cocktailName = recipe.strDrink; 
      cocktailInfo = "Cocktail Recipe for " + recipe.strDrink + ":" + ingredients + recipe.strInstructions;
      const recipeHtml = `
        <div class="h-2/6 bg-white rounded-md shadow-lg flex-col mb-7">
        <div class="grid grid-cols-2 gap-1">
        <div class="fle">
        <img src="${recipe.strDrinkThumb}" alt="${recipe.strDrink}" class="bg-contain aspect-square rounded-l-md object-fill">
      </div>
      <div class= "ml-4">
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
