const $squaresElements = document.querySelectorAll(".grid__square");
const $mole = document.querySelector(".mole");
const $timeStamp = document.getElementById("time-left");
const $scoreDisplay = document.getElementById("score");
const $startButton = document.getElementById("start");

let result = 0;
let hitPosition;
let time = 60;
let timerID = null;

let countDownTimerId;

function randomSquare() {
  let randomSquare = $squaresElements[Math.floor(Math.random() * 9)];

  $squaresElements.forEach((square) => {
    square.classList.remove("mole");
  });

  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

$squaresElements.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      $scoreDisplay.innerHTML = result;
    }
  });
});

function moveMole() {
  timerID = setInterval(randomSquare, 500);
  countDownTimerId = setInterval(countDown, 1000);
  $startButton.setAttribute("disabled", true);
  $startButton.style.cursor = "not-allowed";
}

function countDown() {
  time--;
  $timeStamp.innerHTML = time;

  if (time === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerID);
    alert("Jogo Acabou!Sua pontuação é: " + result);
    $startButton.removeAttribute("disabled");
    $startButton.style.cursor = "not-allowed";
  }
}
