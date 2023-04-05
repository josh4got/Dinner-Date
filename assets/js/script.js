var apiKey = 'b48a85cecf0a47eba4b20401a0ee0e14';
var button = document.getElementById('btn-primary');

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
    difficultyLevel = "20";
});

mediumBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("40");
    difficultyLevel = "40";
});

hardBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log("60");
    difficultyLevel = "60";
});

function generateRecipe(event){
    console.log("Hello");
    event.preventDefault();
    var urlRequest = `https://api.spoonacular.com/recipes/random?number=1&type=breakfast&cuisine=${cuisineType}&readyInMinutes=${difficultyLevel}&diet=${dietType}&apiKey=${apiKey}`;

    fetch(urlRequest,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(function (response) {
        return response.json();
      })
        
      .then(function (data) {
        console.log(data);
        var recipeList = document.getElementById('recipes');
        var recipe1 = document.createElement('div');

        var recipeLink = document.createElement('a');
        recipeLink.href = data.recipes[0].spoonacularSourceUrl;
        recipeLink.innerText = data.recipes[0].title;
        recipe1.appendChild(recipeLink);
        console.log(recipe1);
        recipeList.appendChild(recipe1);
      });
     }
    

button.addEventListener('click', generateRecipe);
