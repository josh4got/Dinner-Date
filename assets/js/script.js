
var apiKey = 'b48a85cecf0a47eba4b20401a0ee0e14';
var button = document.getElementById('btn');


function generateRecipe(event){
    console.log("Hello");
    event.preventDefault();
    var urlRequest = `https://api.spoonacular.com/recipes/random?number=1&type=main-course&apiKey=${apiKey}`;

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
      });
        
      
      }
    
button.addEventListener('click', generateRecipe);