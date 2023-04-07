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
    var dates = document.createElement('p');
    var recipeName = document.createElement('a');
    var servings = document.createElement('p');
    var prepTime = document.createElement('p');
    var summary = document.createElement('p');
    var calendarBtn = document.createElement('button');

    recipeName.href = recipeObject.recipes[i].spoonacularSourceUrl;
    recipeName.innerText = recipeObject.recipes[i].title;
    var dtStamp = now.add(i, 'day').format('YYYYMMDD');
    dates.setAttribute('data-dtStamp', dtStamp);
    dates.innerText= now.add(i, 'day').format('dddd MMMM D');
    summary.innerHTML = recipeObject.recipes[i].summary.split('.')[0] + '.';

    prepTime.innerText = "Prep time: " + recipeObject.recipes[i].readyInMinutes + " minutes";
    servings.innerText = "Serves: " + recipeObject.recipes[i].servings;

    recipeContainerEl.appendChild(dates);
    recipeContainerEl.appendChild(recipeName);
    recipeContainerEl.appendChild(prepTime);
    recipeContainerEl.appendChild(servings);
    recipeContainerEl.appendChild(summary);
    recipeContainerEl.appendChild(calendarBtn);

    var calendarSummary = `Today's Recipe:${recipeName.innerText}`
    var calendarDescription = recipeName.href;
    var testIcs = 
//!!Do not indent this template literal! Sorry it's ugly, but the .ics file type does not allow indentation and the template literal interprets indentation into the file.
`BEGIN:VCALENDAR
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
END:VCALENDAR`
    //This function creates an anchor with an href that generates an ics file. Code copied from Stack Overflow (https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server/18197341#18197341)	
    function addToCalendar (filename, text) {
      // var dtEnd = now.add(1, 'day').format('YYYYMMDD') // (i, 'day') add data attribute to i-th card
      var calendarBtnHref = document.createElement('a');
      calendarBtnHref.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      calendarBtnHref.textContent = "Add to calendar";
      calendarBtnHref.setAttribute('download', filename);
      calendarBtn.appendChild(calendarBtnHref);
      console.log(testIcs);
    }
    calendarBtn.addEventListener("click", addToCalendar("DinnerDate.ics", testIcs));
  }
}

var dtStamp = now.format('YYYYMMDD');
