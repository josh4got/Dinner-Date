
var now = dayjs();
console.log(now);
var dtStamp = now.format('YYYYMMDD');
var dtEnd = now.add(1, 'day').format('YYYYMMDD') // (i, 'day') add data attribute to i-th card
var summary = `Today's Recipe:{recipeName}`
var description = `{recipeLink}`
//var recipeName = recipeName.innerText
// recipeLink = recipeName.href


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
SUMMARY:${summary}
DESCRIPTION: ${description}
END:VEVENT
END:VCALENDAR`

//This function creates an anchor with an href that generates an ics file. Code copied from Stack Overflow (https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server/18197341#18197341)	

function download(filename, text) {
    var button = document.createElement('button')
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    console.log(element);
    console.log(testIcs);
    element.textContent = "Add to calendar";
    element.setAttribute('download', filename);
    document.body.appendChild(button);
    button.appendChild(element);
  }

  download("test2.ics", testIcs);


//var icsAddress = document.getElementById('address')
//console.log(icsAddress)

//get  info from fields to populate in ics file
//create ics file object
//on click create and then download file with dynamically generated information
//get today's date
//create timestamp for todays date
//write logic for today's date + 
