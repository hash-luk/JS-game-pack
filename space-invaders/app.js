const $grid = document.querySelector(".grid");
const $resultsDisplay = document.querySelector("#result");
const $score = document.querySelector("#score");
const alienIvanders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersID;
let goingRight = true;
let aliensRemoved = [];
let points = 0;

for (let i = 0; i < 225; i++) {
  const $square = document.createElement("div");
  $grid.appendChild($square);
}

const $squares = Array.from(document.querySelectorAll(".grid div"));

function drawInvaders() {
  for (let i = 0; i < alienIvanders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      $squares[alienIvanders[i]].classList.add("invader");
    }
  }
}

drawInvaders();

function removeInvaders() {
  for (let i = 0; i < alienIvanders.length; i++) {
    $squares[alienIvanders[i]].classList.remove("invader");
  }
}

$squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
  $squares[currentShooterIndex].classList.remove("shooter");

  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) {
        currentShooterIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) {
        currentShooterIndex += 1;
      }
      break;
  }
  $squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  const leftEdge = alienIvanders[0] % width === 0;
  const rightEdge =
    alienIvanders[alienIvanders.length - 1] % width === width - 1;
  removeInvaders();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienIvanders.length; i++) {
      alienIvanders[i] += width - 1;
      direction = -1;
      goingRight = false;
    }
  } else if (leftEdge && !goingRight) {
    for (let i = 0; i < alienIvanders.length; i++) {
      alienIvanders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienIvanders.length; i++) {
    alienIvanders[i] += direction;
  }

  drawInvaders();

  if ($squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    $resultsDisplay.innerHTML = "Você Perdeu";
    clearInterval(invadersID);
  }

  for (let i = 0; i < alienIvanders.length; i++) {
    if (alienIvanders[i] > $squares.length) {
      $resultsDisplay.innerHTML = "Você Perdeu";
      clearInterval(invadersID);
    }
  }

  if (aliensRemoved.length === alienIvanders.length) {
    $resultsDisplay.innerHTML = "Você Ganhou";
    clearInterval(invadersID);
  }
}

function shoot(e) {
  let laserID;
  let currentLaserIndex = currentShooterIndex;

  function moveLaser() {
    if (currentLaserIndex < width) {
      $squares[currentLaserIndex].classList.remove("laser");
      clearInterval(laserID);
      return;
    }

    $squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    $squares[currentLaserIndex].classList.add("laser");

    if ($squares[currentLaserIndex].classList.contains("invader")) {
      $squares[currentLaserIndex].classList.remove("laser");
      $squares[currentLaserIndex].classList.remove("invader");
      $squares[currentLaserIndex].classList.add("boom");

      setTimeout(() => {
        $squares[currentLaserIndex].classList.remove("boom");
      }, 300);
      clearInterval(laserID);

      const alienRemoved = alienIvanders.indexOf(currentLaserIndex);
      aliensRemoved.push(alienRemoved);
      points++;
      $score.innerHTML = points;
    }
  }

  switch (e.key) {
    case "ArrowUp":
      laserID = setInterval(moveLaser, 100);
  }
}

const controls = {
  start: () => {
    invadersID = setInterval(moveInvaders, 500);
    document.addEventListener("keydown", shoot);
  },
  restart: () => {
    window.location.reload();
  },
  pause: () => {
    clearInterval(invadersID);
  },
};
