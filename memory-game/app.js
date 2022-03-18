const $gridElement = document.querySelector(".content__grid");
const $resultDisplayElement = document.querySelector("#score");
const $cardsElement = document.getElementById("#card");
const $startButton = document.getElementById("start");

let chosenCards = [];
let chosenCardsIDs = [];
const cardsWon = [];
let score = 0;

const cards = [
  {
    id: 1,
    name: "Vaporeon",
    image: "./images/pokemon01.png",
  },
  {
    id: 2,
    name: "Sandshrew",
    image: "./images/pokemon02.png",
  },
  {
    id: 3,
    name: "Charmander",
    image: "./images/pokemon03.png",
  },
  {
    id: 4,
    name: "Pikachu",
    image: "./images/pokemon04.png",
  },
  {
    id: 5,
    name: "Caterpie",
    image: "./images/pokemon05.png",
  },
  {
    id: 6,
    name: "Squirtle",
    image: "./images/pokemon06.png",
  },
  {
    id: 7,
    name: "Vaporeon",
    image: "./images/pokemon01.png",
  },
  {
    id: 8,
    name: "Sandshrew",
    image: "./images/pokemon02.png",
  },
  {
    id: 9,
    name: "Charmander",
    image: "./images/pokemon03.png",
  },
  {
    id: 10,
    name: "Pikachu",
    image: "./images/pokemon04.png",
  },
  {
    id: 11,
    name: "Caterpie",
    image: "./images/pokemon05.png",
  },
  {
    id: 12,
    name: "Squirtle",
    image: "./images/pokemon06.png",
  },
];

//Shuffle cards
cards.sort(() => 0.5 - Math.random());

//Create board card, disable cursos until cards flip, disable start button
function createBoard() {
  $startButton.setAttribute("disabled", "true");

  for (let i = 0; i < cards.length; i++) {
    const $cardElement = document.createElement("img");
    $cardElement.setAttribute("src", cards[i].image);
    $cardElement.setAttribute("data-id", i);
    $cardElement.setAttribute("id", "card");
    $cardElement.setAttribute("onclick", "flipCard(this)");
    $gridElement.appendChild($cardElement);

    const imagesCards = document.querySelectorAll("img");

    imagesCards.forEach((card) => {
      card.style.pointerEvents = "none";
    });

    setTimeout(() => {
      const imagesCards = document.querySelectorAll("img");
      imagesCards.forEach((card) => {
        card.setAttribute("src", "./images/backcard.png");
        card.style.pointerEvents = "auto";
      });
    }, 3000);
  }
}


//Check cards match and restart flow
function checkCardsMatch() {
  const cards = document.querySelectorAll("img");
  const optionOne = chosenCardsIDs[0];
  const optionTwo = chosenCardsIDs[1];

  if (chosenCards[0] === chosenCards[1]) {
    setTimeout(() => {
      cards[optionOne].style.opacity = 0;
      cards[optionOne].style.cursor = "auto";
      cards[optionOne].removeAttribute("onclick");

      cards[optionTwo].style.opacity = 0;
      cards[optionTwo].style.cursor = "auto";
      cards[optionTwo].removeAttribute("onclick");
    }, 1000);
    score = score + 1;

    $resultDisplayElement.innerHTML = score;

    cardsWon.push(chosenCards);
  } else {
    setTimeout(() => {
      cards[optionOne].setAttribute("src", "./images/backcard.png");
      cards[optionTwo].setAttribute("src", "./images/backcard.png");
    }, 800);
  }

  chosenCards = [];
  chosenCardsIDs = [];

  if (cardsWon.length === cards.length / 2) {
    $resultDisplayElement.innerHTML =
      "Parabéns você encontrou todas as cartas!";

    cards.forEach((card) => {
      card.remove();
    });

    $startButton.removeAttribute("disabled");
  }
}


//Flip cards, setting the image to the Pokemon
function flipCard(el) {
  let elementID = el.getAttribute("data-id");
  chosenCards.push(cards[elementID].name);
  chosenCardsIDs.push(elementID);
  el.setAttribute("src", cards[elementID].image);

  if (chosenCards.length === 2) {
    setTimeout(checkCardsMatch(), 60000);
  }
}
