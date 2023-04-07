
var apiKey = 'b48a85cecf0a47eba4b20401a0ee0e14';
var button = document.getElementById('generate');
// var recipeList = document.getElementById('recipes');

//cuisine type button variables
var italianBtn = document.querySelector("[data-cuisinetype='italian']");
var mexicanBtn = document.querySelector("[data-cuisinetype='mexican']");
var indianBtn = document.querySelector("[data-cuisinetype='indian']");
// diet type button variables
var vegetarianBtn = document.querySelector("[data-diettype='vegetarian']");
var veganBtn = document.querySelector("[data-diettype='vegan']");
var glutenFreeBtn = document.querySelector("[data-diettype='gluten-free']");
// difficulty level button variables
var easyBtn = document.querySelector("[data-difficultlevel='easy']");
var mediumBtn = document.querySelector("[data-difficultlevel='medium']");
var hardBtn = document.querySelector("[data-difficultlevel='hard']");

// sets the cuisine type to null
var cuisineType = '';
// sets cuisine type variable to italian if the italian button is clicked
italianBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("italian");
    cuisineType = "Italian";
});
// sets cuisine type variable to mexican if the mexican button is clicked
mexicanBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("mexican");
    cuisineType = "Mexican";
});
// sets cuisine type variable to indian if the indian button is clicked
indianBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("indian");
    cuisineType = "Indian";
});

var dietType = '';

vegetarianBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("vegetarian");
    dietType = "Vegetarian";
});

veganBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("vegan");
    dietType = "Vegan";
});

glutenFreeBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("gluten free");
    dietType = "GlutenFree";
});

var difficultyLevel = '';

easyBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("20");
    difficultyLevel = "<20";
});

mediumBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("40");
    difficultyLevel = "<40";
});

hardBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("60");
    difficultyLevel = ">60";
});

function generateRecipe(event){
    console.log("Hello");
    // event.preventDefault();
    var urlRequest = `https://api.spoonacular.com/recipes/random?number=3&type=breakfast&cuisine=${cuisineType}&readyInMinutes=${difficultyLevel}&diet=${dietType}&apiKey=${apiKey}`;

    fetch(urlRequest,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(function (response) {
        return response.json();
      })

      .then(function (data){
        
        window.location.href = 'calendar.html';
        displayRecipe(data);
      })

        
      // .then(function (data) {
      //   console.log(data);
      //   for (var i = 0; i < data.recipes.length; i++){
          
      //     var recipeName = document.createElement('a');
      //     var servings = document.createElement('p');
      //     var timeToPrep = document.createElement('p');


         
      //     recipeName.href = data.recipes[i].spoonacularSourceUrl;
      //     recipeName.innerText = ("Title: " + data.recipes[i].title);
      //     timeToPrep.innerText = ("Time to Prepare: " + data.recipes[i].readyInMinutes);
      //     servings.innerText = ("Number of Servings: " + data.recipes[i].servings);
      

      //     recipeList.appendChild(recipeName);
      //     console.log(recipeName);
      //     recipeList.appendChild(timeToPrep);
      //     recipeList.appendChild(servings);
      //   }
      // });
     }
    








function displayRecipe(data){
  window.onload = function(){
    var recipeContainer = document.getElementById('recipe-container');
    console.log(data)
    recipeContainer.innerHTML = 'hello';
   
  
    // for (var i = 0; i < data.recipes.length; i++){
      
    //   var recipeName = document.createElement('a');
    //   var servings = document.createElement('p');
    //   var timeToPrep = document.createElement('p');
  
  
     
    //   recipeName.href = data.recipes[i].spoonacularSourceUrl;
    //   recipeName.innerText = ("Title: " + data.recipes[i].title);
    //   timeToPrep.innerText = ("Time to Prepare: " + data.recipes[i].readyInMinutes);
    //   servings.innerText = ("Number of Servings: " + data.recipes[i].servings);
    
  
  
    //   recipeContainer.appendChild(recipeName);
    //   console.log(recipeName);
    //   recipeContainer.appendChild(timeToPrep);
    //   recipeContainer.appendChild(servings);
    }
  };






// document.getElementById("generate").onclick = function() {
//   generateRecipe();
//   location.href = "calendar.html";
 
// };

button.addEventListener('click', generateRecipe);





// Josh .js

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





// Cheryl .js

var now = dayjs();
console.log(now);
var dtStamp = now.format(‘YYYYMMDD’);
var dtStart = now.add(1, ‘day’).format(‘YYYYMMDD’);
var summary = “Name of recipe”
var description = “https://google.com”
//Text example for a new ICS file
var testIcs = `
    BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//hacksw/handcal//NONSGML v1.0//EN
    BEGIN:VEVENT
    UID:uid1@example.com
    DTSTAMP:${dtStamp}T190000Z
    ORGANIZER;CN=Dinnerdate:MAILTO:john.doe@example.com
    DTSTART:${dtStart}T190000Z
    DTEND:${dtStart}T040000Z
    SUMMARY:${summary}
    DESCRIPTION: ${description}
    END:VEVENT
    END:VCALENDAR`
//This function creates an anchor with an href that generates an ics file. Code copied from Stack Overflow (https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server/18197341#18197341)
function download(filename, text) {
    var button = document.createElement(‘button’)
    var element = document.createElement(‘a’);
    element.setAttribute(‘href’, ‘data:text/plain;charset=utf-8,’ + encodeURIComponent(text));
    console.log(element);
    console.log(testIcs);
    element.textContent = “Add to calendar”;
    element.setAttribute(‘download’, filename);
    document.body.appendChild(button);
    button.appendChild(element);
  }
  download(“test2.ics”, testIcs)
