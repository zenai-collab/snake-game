# Snake Game

A classic Snake game implemented in JavaScript using the HTML5 Canvas. Control the snake, eat food, avoid obstacles, and try to achieve the highest score!

## Features

- Smooth snake movement with edge wrapping
- Colorful snake and food with gradients
- Obstacles for added challenge
- Sound effects for eating food and game over
- Score display and restart option

## How to Play

- Use the **Arrow keys** to control the snake's direction (Up, Down, Left, Right).
- Eat the food (red-yellow circle) to grow and increase your score.
- Avoid running into your own body or obstacles (gray blocks).
- The game ends if you collide with yourself or an obstacle.
- After game over, press **R** to restart.

## Installation & Running

1. Clone this repository:

2. Open `index.html` in your web browser.

## Project Structure

- `index.html` – Main HTML file with the canvas and score display.
- `snake.js` – Game logic and rendering.
- `sounds/` – Sound effects for eating and game over.

## Customization

- You can add or remove obstacles by editing the `obstacles` array in `snake.js`.
- Change the grid size by modifying the `grid` variable.
