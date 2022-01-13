const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const score_element = document.getElementById("score") as HTMLParagraphElement;

canvas.width = 500;
canvas.height = 500;

interface snakePosConfig {
  x: number;
  y: number;
}

interface randomAppleConfig {
  xPos: number;
  yPos: number;
}

let index: number = 25;
let score: number = 0;

let snake: snakePosConfig[] = [];

snake[0] = {
  x: index * 9,
  y: index * 10,
};

let randomApple: randomAppleConfig = {
  xPos: Math.floor(Math.random() * (500 / index)) * index,
  yPos: Math.floor(Math.random() * (500 / index)) * index,
};

let currentKey: string;

document.addEventListener("keydown", directions);

function directions(e: KeyboardEvent) {
  if (e.keyCode === 37 && currentKey !== "RIGHT") {
    currentKey = "LEFT";
  } else if (e.keyCode === 38 && currentKey !== "DOWN") {
    currentKey = "UP";
  } else if (e.keyCode === 39 && currentKey !== "LEFT") {
    currentKey = "RIGHT";
  } else if (e.keyCode === 40 && currentKey !== "UP") {
    currentKey = "DOWN";
  }
}

function drawGrid(w: number, h: number) {
  ctx!.canvas.width = w;
  ctx!.canvas.height = h;

  for (let x = 0; x <= w; x += 25) {
    ctx!.moveTo(x, 0);
    ctx!.lineTo(x, h);
    for (let y = 0; y <= h; y += 25) {
      ctx!.moveTo(0, y);
      ctx!.lineTo(w, y);
    }
  }

  ctx!.stroke();
}

function draw() {
  // created snake
  ctx!.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(500, 500);

  for (let i = 0; i < snake.length; i++) {
    ctx!.fillStyle = "#0ba360";
    ctx!.fillRect(snake[i].x, snake[i].y, index, index);

    ctx!.strokeStyle = "#ddd";
    ctx!.strokeRect(snake[i].x, snake[i].y, index, index);
  }
  //   // random apple
  ctx!.fillStyle = "red";
  ctx!.fillRect(randomApple.xPos, randomApple.yPos, index, index);

  let snakeX: number = snake[0].x;
  let snakeY: number = snake[0].y;

  // snake directions
  if (currentKey === "LEFT") snakeX -= index;
  if (currentKey === "UP") snakeY -= index;
  if (currentKey === "RIGHT") snakeX += index;
  if (currentKey === "DOWN") snakeY += index;

  let newHead: snakePosConfig = {
    x: snakeX,
    y: snakeY,
  };

  // every time when snake eats apple spawn again
  if (snakeX == randomApple.xPos && snakeY == randomApple.yPos) {
    score++;
    score_element.innerHTML = `score: ${score}`;
    randomApple = {
      xPos: Math.floor(Math.random() * (500 / index)) * index,
      yPos: Math.floor(Math.random() * (500 / index)) * index,
    };
  } else {
    snake.pop();
  }

  //   game over function
  canvasCollision(newHead);

  snake.unshift(newHead);
}

function canvasCollision(head: snakePosConfig) {
  if (
    head.x > canvas.width - index ||
    head.y > canvas.height - index ||
    head.x < 0 ||
    head.y < 0
  ) {
    console.log("collision");
    clearInterval(game);
  }
}

let game: number = setInterval(draw, 100);
