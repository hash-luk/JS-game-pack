const $timerElement = document.querySelector("#timer");
const $resultElement = document.querySelector("#result");
const $startPauseButton = document.querySelector("#start");
const $squaresArray = document.querySelectorAll(".grid div");
const $logLeftElements = document.querySelectorAll(".log-left");
const $logRightElements = document.querySelectorAll(".log-right");
const $carsLeftElements = document.querySelectorAll(".car-left");
const $carsRightElements = document.querySelectorAll(".car-right");
const width = 9;

let currentIndex = 76;
let timerID;
let currentTime = 5;
let outComeTimerID

function moveFrog(e) {
  $squaresArray[currentIndex].classList.remove("frog");

  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) {
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) {
        currentIndex += 1;
      }
      break;
    case "ArrowUp":
      if (currentIndex - width >= 0) {
        currentIndex -= width;
      }
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) {
        currentIndex += width;
      }
      break;
  }

  $squaresArray[currentIndex].classList.add("frog");
}

function autoMoveElements() {
  currentTime--;
  $timerElement.innerHTML = currentTime;
  $logLeftElements.forEach((logLeft) => moveLogLeft(logLeft));
  $logRightElements.forEach((logRight) => moveLogRight(logRight));
  $carsLeftElements.forEach((carLeft) => moveCarsLeft(carLeft));
  $carsRightElements.forEach((carRight) => moveCarsRight(carRight));
}

function checkOutComes() {
    checkVictory();
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
}

function moveCarsRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
  }
}

function moveCarsLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}

function checkVictory() {
  if (
    $squaresArray[currentIndex].classList.contains("c1") ||
    $squaresArray[currentIndex].classList.contains("l4") ||
    $squaresArray[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    $resultElement.innerHTML = "Você Perdeu =(";
    $resultElement.classList.add('win')
    clearInterval(timerID);
    clearInterval(outComeTimerID)
    $squaresArray[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  } else if ($squaresArray[currentIndex].classList.contains("ending-block")) {
    $resultElement.innerHTML = "Você Ganhou =)";
    $resultElement.classList.add('lose')
    clearInterval(timerID);
    clearInterval(outComeTimerID)
    document.removeEventListener("keyup", moveFrog);
  }
}

function startPauseGame() {
  if (timerID) {
    clearInterval(timerID);
    clearInterval(outComeTimerID)
    outComeTimerID=null
    timerID = null;
    document.removeEventListener("keyup", moveFrog);
  } else {
    timerID = setInterval(autoMoveElements, 1000);
    outComeTimerID = setInterval(checkOutComes,50)
    document.addEventListener("keyup", moveFrog);
  }
}
