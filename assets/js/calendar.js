var apiKey = '1ba08610419e4c7a9791d166c28d523e';
var now = dayjs();
console.log(now);


//var recipeName = recipeName.innerText
// recipeLink = recipeName.href
var urlRequest = `https://api.spoonacular.com/recipes/random?number=3&tags=dinner&apiKey=${apiKey}`;
var recipeObject = ''

generateRecipe(urlRequest);

function generateRecipe(urlRequest){
  fetch(urlRequest,{
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    recipeObject = data;
    console.log(recipeObject);
    displayRecipe(recipeObject);
  })
}

function displayRecipe(recipeObject) {
    
    var recipeContainerEl = document.getElementById('recipes');
    for (let i=0; i < recipeObject.recipes.length; i++){
        var cardEl2 = document.createElement('div');
    //   cardEl2.className = 'w-1/6 h-auto bg-gray-200 mx-1 px-5 flex flex-col gap-1 items-center mb-0 justify-between';
      // create a div for each recipe card
      var cardEl = document.createElement('div');
      cardEl.className = 'w-1/6 h-auto bg-gray-200 mx-1 px-5 flex flex-col gap-1 items-center mb-0 justify-between';
      // create a div for the date and add a data attribute for dtStamp
      var dateEl = document.createElement('p');
      dateEl.className = 'text-lg font-bold mb-2 card-section';
      var dtStamp = now.add(i, 'day').format('YYYYMMDD');
      dateEl.setAttribute('data-dtStamp', dtStamp);
      dateEl.innerText = now.add(i, 'day').format('dddd MMMM D');
  
      // create a div for the recipe name and link to the recipe page
      var nameEl = document.createElement('h3');
      nameEl.className = 'text-xl font-bold mt-2 mb-1 flex justify-center items-center card-section';
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
      calendarBtn.className = 'py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2';
      calendarBtn.innerText = 'Add to calendar';
  
      // add event listener to button for adding to calendar
      calendarBtn.addEventListener("click", function() {
        var calendarSummary = `Today's recipe: ${nameLink.innerText}`;
        var calendarDescription = recipeLink;
var testIcs =` 
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
  
        var calendarBtnHref = document.createElement('a');
        calendarBtnHref.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(testIcs));
        calendarBtnHref.setAttribute('download', 'DinnerDate.ics');
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

var dtStamp = now.format('YYYYMMDD');
