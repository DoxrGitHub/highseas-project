const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const playerSpeed = 2;
const jumpStrength = -7;

const player = {
  x: 20,
  y: 100,
  width: 10,
  height: 10,
  color: "#FF0000", 
  dx: 0,
  dy: 0,
  grounded: false
};

const platforms = [
  { x: 0, y: 140, width: 300, height: 10, color: "#654321" }, 
  { x: 50, y: 100, width: 40, height: 10, color: "#654321" },
  { x: 120, y: 80, width: 50, height: 10, color: "#654321" }
];

const keys = {};

document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

function update() {

  if (keys["ArrowLeft"]) player.dx = -playerSpeed;
  if (keys["ArrowRight"]) player.dx = playerSpeed;
  if (!keys["ArrowLeft"] && !keys["ArrowRight"]) player.dx = 0;

  if (keys["ArrowUp"] && player.grounded) {
    player.dy = jumpStrength;
    player.grounded = false;
  }

  player.dy += gravity;

  player.x += player.dx;
  player.y += player.dy;

  player.grounded = false;
  for (let platform of platforms) {

    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y + player.height < platform.y + platform.height
    ) {
      player.dy = 0;
      player.y = platform.y - player.height;
      player.grounded = true;
    }
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y > canvas.height) player.y = canvas.height; 
}

function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  platforms.forEach((platform) => {
    ctx.fillStyle = platform.color;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();