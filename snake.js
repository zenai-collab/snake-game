// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Size of each grid cell
const grid = 20;

// Initialize the snake as an array of segments (starting with one segment)
let snake = [{ x: 160, y: 160 }];

// Initial movement direction
let direction = 'right';

// Initial food position
let food = { x: 320, y: 320 };

// Player's score
let score = 0;

// Game state flag
let gameOver = false;

// Sound effects
const eatSound = new Audio('sounds/eat.mp3');
const gameOverSound = new Audio('sounds/gameover.mp3');

// Obstacles array
let obstacles = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 100 }
];

// Generate a random position for food, aligned to the grid
function getRandomPosition() {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
      y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
    };
  } while (
    snake.some(segment => segment.x === position.x && segment.y === position.y) ||
    obstacles.some(obs => obs.x === position.x && obs.y === position.y)
  );
  return position;
}

// Update the score display at the end of the page
function updateScoreDisplay() {
  const scoreDiv = document.getElementById('score');
  if (scoreDiv) {
    scoreDiv.textContent = 'Score: ' + score;
  }
}

// Draw the game state: snake and food
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw obstacles with a shadow
  obstacles.forEach(obs => {
    ctx.fillStyle = 'rgba(120,120,120,0.8)';
    ctx.shadowColor = '#333';
    ctx.shadowBlur = 8;
    ctx.fillRect(obs.x + 2, obs.y + 2, grid - 4, grid - 4);
    ctx.shadowBlur = 0;
  });

  // Draw food as a circle with a gradient
  const foodGradient = ctx.createRadialGradient(
    food.x + grid / 2, food.y + grid / 2, grid / 8,
    food.x + grid / 2, food.y + grid / 2, grid / 2
  );
  foodGradient.addColorStop(0, '#fffa90');
  foodGradient.addColorStop(1, '#e74c3c');
  ctx.fillStyle = foodGradient;
  ctx.beginPath();
  ctx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2.2, 0, Math.PI * 2);
  ctx.fill();

  // Draw snake: head with a different color, body with gradient
  snake.forEach((part, idx) => {
    if (idx === 0) {
      ctx.fillStyle = '#27ae60'; // Head color
      ctx.strokeStyle = '#145a32';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(part.x + grid / 2, part.y + grid / 2, grid / 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      const bodyGradient = ctx.createLinearGradient(part.x, part.y, part.x + grid, part.y + grid);
      bodyGradient.addColorStop(0, '#58d68d');
      bodyGradient.addColorStop(1, '#229954');
      ctx.fillStyle = bodyGradient;
      ctx.beginPath();
      ctx.arc(part.x + grid / 2, part.y + grid / 2, grid / 2.3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // If game over, show message and restart option
  if (gameOver) {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over! Score: ' + score, canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '20px Arial';
    ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 20);
  }

  // Update the score display
  updateScoreDisplay();
}

// Move the snake in the current direction and handle game logic
function moveSnake() {
  if (gameOver) return; 

  const head = { ...snake[0] };
  if (direction === 'left') head.x -= grid;
  if (direction === 'right') head.x += grid;
  if (direction === 'up') head.y -= grid;
  if (direction === 'down') head.y += grid;

  // Edge wrapping: if the snake goes off one edge, it appears on the opposite edge
  if (head.x < 0) head.x = canvas.width - grid;
  if (head.x >= canvas.width) head.x = 0;
  if (head.y < 0) head.y = canvas.height - grid;
  if (head.y >= canvas.height) head.y = 0;

  // Check for collision with self or obstacles
  if (
    snake.some(segment => segment.x === head.x && segment.y === head.y) ||
    obstacles.some(obs => obs.x === head.x && obs.y === head.y)
  ) {
    gameOverSound.play(); // Play game over sound
    gameOver = true;
    draw();
    return;
  }

  snake.unshift(head);

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    eatSound.play(); // Play eat sound
    food = getRandomPosition();
  } else {
    snake.pop();
  }
}

// Listen for arrow key presses to change direction or restart
document.addEventListener('keydown', e => {
  if (!gameOver) {
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
  }
  // Restart game if 'R' is pressed after game over
  if (gameOver && (e.key === 'r' || e.key === 'R')) {
    restartGame();
  }
});

// Main game loop: move the snake and redraw everything
function gameLoop() {
  moveSnake();
  draw();
}

// Restart the game by resetting all variables
function restartGame() {
  snake = [{ x: 160, y: 160 }];
  direction = 'right';
  food = { x: 320, y: 320 };
  score = 0;
  gameOver = false;
}

// Start the game loop, updating every 300 milliseconds (slower speed)
setInterval(gameLoop, 300);