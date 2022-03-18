const $gridElement = document.querySelector(".grid");
const $scoreDisply = document.getElementById("score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;
const userStartPosition = [230, 10];
const ballStartPosition = [270, 33];
let currentBallPosition = ballStartPosition;
let currentUserPosition = userStartPosition;
let timerID;
let xDirection = -2;
let yDirection = 2;
let score = 0;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const $blockElement = document.createElement("div");
    $blockElement.classList.add("block");
    $blockElement.style.left = blocks[i].bottomLeft[0] + "px";
    $blockElement.style.bottom = blocks[i].bottomLeft[1] + "px";
    $gridElement.appendChild($blockElement);
  }
}
addBlock();

const $userElement = document.createElement("div");
$userElement.classList.add("user");
setUser();
$gridElement.appendChild($userElement);

function setUser() {
  $userElement.style.left = currentUserPosition[0] + "px";
  $userElement.style.bottom = currentUserPosition[1] + "px";
}

function setBall() {
  ball.style.left = currentBallPosition[0] + "px";
  ball.style.bottom = currentBallPosition[1] + "px";
}

function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentUserPosition[0] > 0) {
        currentUserPosition[0] -= 10;
        setUser();
      }
      break;

    case "ArrowRight":
      if (currentUserPosition[0] < boardWidth - blockWidth) {
        currentUserPosition[0] += 10;
        setUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

const ball = document.createElement("div");
ball.classList.add("ball");
setBall();
$gridElement.appendChild(ball);

function moveBall() {
  currentBallPosition[0] += xDirection;
  currentBallPosition[1] += yDirection;
  setBall();
  checkCollisions();
}



function startGame() {
    timerID = setInterval(moveBall, 30);
}

function restartGame() {
    location.reload()
}




function checkCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      currentBallPosition[0] > blocks[i].bottomLeft[0] &&
      currentBallPosition[0] < blocks[i].bottomRight[0] &&
      currentBallPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      currentBallPosition[1] < blocks[i].topLeft[1]
    ) {
      const $allBlocksElements = Array.from(
        document.querySelectorAll(".block")
      );
      $allBlocksElements[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      $scoreDisply.innerHTML = score;

      if(blocks.length === 0) {
          $scoreDisply.innerHTML = 'Você Ganhou =)!'
          clearInterval(timerID)
          document.removeEventListener("keydown",moveUser)
      }
    }
  }

  if (
    currentBallPosition[0] > currentUserPosition[0] &&
    currentBallPosition[0] < currentUserPosition[0] + blockWidth &&
    currentBallPosition[1] > currentUserPosition[1] &&
    currentBallPosition[1] < currentUserPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  if (
    currentBallPosition[0] >= boardWidth - ballDiameter ||
    currentBallPosition[1] >= boardHeight - ballDiameter ||
    currentBallPosition[0] <= 0
  ) {
    changeDirection();
  } else if (currentBallPosition[1] <= 0) {
    clearInterval(timerID);
    $scoreDisply.innerHTML = "You Lose =(";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
