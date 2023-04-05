let cocktailButtons = document.getElementsByClassName("btnC");
let cocktail = "";
for (let i = 0; i < cocktailButtons.length; i++) {
  let cocktailButton = cocktailButtons[i];
  cocktailButton.addEventListener("click", function (event) {
    event.preventDefault();
    cocktail = this.textContent;
    console.log(cocktail);
    if (cocktail === "Yes") console.log("Happy Hour");
    else console.log("No Happy Hour");
  });
}
