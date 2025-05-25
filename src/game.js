import { ctx, canvas } from "./setup.js";
import Ball from "./ball.js";
import levels from "./levels.js";

// Configuration
const maxVelocity = 20;

const winDisplay = document.getElementById("win-display");
const finishDisplay = document.getElementById("finish-display");
const levelText = document.getElementById("level-text");
const strokeDisplay = document.getElementById("stroke-count");

// Game state
const golfBall = new Ball(250, 250, 20, 0, 0, 0.97);
let mouseX = 0;
let mouseY = 0;
let aiming = false;
let hoveringBall = false;
let currentLevel = 0;

let winTimeout;
let win = false;

let strokeCount = 0;

// Utility
function clamp(min, max, value) {
  return Math.max(min, Math.min(max, value));
}

golfBall.x = levels[currentLevel].ballX;
golfBall.y = levels[currentLevel].ballY;

function nextLevel() {
  currentLevel += 1;
  if (currentLevel == levels.length) {
    currentLevel = 0;
    return;
  }
  levelText.textContent = levels[currentLevel].name;
  golfBall.x = levels[currentLevel].ballX;
  golfBall.y = levels[currentLevel].ballY;
  golfBall.velX = 0;
  golfBall.velY = 0;
  winDisplay.classList.remove("visible");
  win = false;
  clearTimeout(winTimeout);
}

// Game Loop Functions
function update() {
  golfBall.move(levels[currentLevel].obstacles);

  const dx = golfBall.x - levels[currentLevel].holeX;
  const dy = golfBall.y - levels[currentLevel].holeY;
  const holeDistance = Math.hypot(dx, dy);

  if (holeDistance <= (golfBall.radius + golfBall.radius)) {
    if (!win) {
      win = true;
      if (currentLevel == levels.length-1) {
        finishDisplay.classList.add("visible");
      }else {
        winDisplay.classList.add("visible");
        winTimeout = setTimeout(nextLevel, 5000);
      }
    }
  }
}

function drawHole() {
  ctx.fillStyle = "rgb(44, 44, 44)";
  ctx.beginPath();
  ctx.arc(levels[currentLevel].holeX, levels[currentLevel].holeY, golfBall.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawAimer() {
  const dx = mouseX - golfBall.x;
  const dy = mouseY - golfBall.y;
  const length = Math.hypot(dx, dy);

  const maxLength = maxVelocity * 10;
  let clampedDX = dx;
  let clampedDY = dy;

  if (length > maxLength) {
    const scale = maxLength / length;
    clampedDX *= scale;
    clampedDY *= scale;
  }

  const gradient = ctx.createRadialGradient(
    golfBall.x, golfBall.y, 0,
    golfBall.x, golfBall.y, maxLength
  );

  gradient.addColorStop(0.0, "rgb(81, 255, 0)");
  gradient.addColorStop(0.33, "rgb(255, 251, 0)");
  gradient.addColorStop(0.66, "rgb(255, 153, 0)");
  gradient.addColorStop(1.0, "rgb(255, 0, 0)");

  ctx.lineWidth = 16;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(golfBall.x, golfBall.y);
  ctx.lineTo(golfBall.x - clampedDX, golfBall.y - clampedDY);
  ctx.stroke();
  
  ctx.lineWidth = 8;
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(golfBall.x, golfBall.y);
  ctx.lineTo(golfBall.x - clampedDX, golfBall.y - clampedDY);
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  drawHole();
  if (aiming) {
    drawAimer();
  }
  golfBall.draw(hoveringBall);

  for (const obstacle of levels[currentLevel].obstacles) {
    ctx.beginPath();
    ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fillStyle = "rgb(158, 107, 84)";
    ctx.fill();
    ctx.stroke();
  }
}

export function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Event Listeners
document.addEventListener("mouseup", () => {
  // checks if you are aiming
  if (hoveringBall) {
    aiming = false;
  }
  if (aiming) {
    golfBall.velX = clamp(-maxVelocity, maxVelocity, (mouseX - golfBall.x) * -0.1);
    golfBall.velY = clamp(-maxVelocity, maxVelocity, (mouseY - golfBall.y) * -0.1);
    aiming = false;
    strokeCount += 1;
    strokeDisplay.textContent = `Total Strokes: ${strokeCount}`;
  }
});

document.addEventListener("mousedown", () => {
  // checks if you are hovering over the ball and it is not moving
  if (!golfBall.isMoving() && hoveringBall && !aiming) {
    aiming = true;
  }
});

document.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  draw();
  // checks if you are hovering over the ball
  if (win) {
    return;
  }
  if (!golfBall.isMoving()) {
    const distanceToBall = Math.hypot(mouseX - golfBall.x, mouseY - golfBall.y);
    hoveringBall = distanceToBall <= golfBall.radius + 5;
  } else {
    hoveringBall = false;
  }

});
