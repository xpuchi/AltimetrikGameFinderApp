const cards = document.querySelector(".cards");

const multiCardBackground = document.getElementById("background-multicard");
const multiCardFill = document.getElementById("fill-multicard");
const singleCardBackground = document.getElementById("background-singlecard");
const singleCardFill = document.getElementById("fill-singlecard");

let layout = "multicard";

// function to change card layout
function toggleDisplay() {
  // declared inside the function because card doesnt exist when JS is loaded, it has to wait for the API.
  // document.getElementsByClassName doesnt work because it returns a HTMLCollection, not an array, so we have to convert it to an array.
  const cardsArray = Array.from(document.getElementsByClassName("card"));
  if (layout === "multicard") {
    // changing button colors
    multiCardBackground.setAttribute("fill", "#303030");
    multiCardFill.setAttribute("fill", "#515151");
    singleCardBackground.setAttribute("fill", "#515151");
    singleCardFill.setAttribute("fill", "#FFFDF5");

    // changing container classes from multi to single
    cards.classList.remove("multi");
    cards.classList.add("single");

    // changing classes for each card
    cardsArray.forEach((card) => {
      card.classList.remove("multi");
      card.classList.add("single");
    });

    // reassignin the value of the variable to single layout
    layout = "singlecard";
  } else {
    multiCardBackground.setAttribute("fill", "#515151");
    multiCardFill.setAttribute("fill", "#FFFDF5");
    singleCardBackground.setAttribute("fill", "#303030");
    singleCardFill.setAttribute("fill", "#515151");

    cards.classList.remove("single");
    cards.classList.add("multi");

    cardsArray.forEach((card) => {
      card.classList.remove("single");
      card.classList.add("multi");
    });

    layout = "multicard";
  }
}
