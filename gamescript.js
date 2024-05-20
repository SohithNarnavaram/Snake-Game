const snake = document.getElementById('snake');
const food = document.getElementById('food');
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScoreValue');

let snakeX = 10;
let snakeY = 10;
let foodX = 5;
let foodY = 5;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let gameRunning = false;
const GRID_SIZE = 20;
const GAME_SIZE = 20;
let intervalId;
const INITIAL_SPEED = 150; // Initial speed of the snake
let speed = INITIAL_SPEED;
let highestScore = localStorage.getItem('highestScore') || 0;

function startGame() {
    gameRunning = true;
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    intervalId = setInterval(update, speed);
}

function update() {
    if (!gameRunning) return;

    snakeX += xVelocity;
    snakeY += yVelocity;

    if (snakeX < 0 || snakeX >= GAME_SIZE || snakeY < 0 || snakeY >= GAME_SIZE) {
        gameOver();
        return;
    }

    if (snakeX === foodX && snakeY === foodY) {
        score++;
        scoreDisplay.textContent = score;
        if (score > highestScore) {
            highestScore = score;
            localStorage.setItem('highestScore', highestScore);
            highScoreDisplay.textContent = highestScore;
        }
        foodX = Math.floor(Math.random() * GAME_SIZE);
        foodY = Math.floor(Math.random() * GAME_SIZE);
        increaseSpeed(); // Increase speed when the snake eats food
    }

    snake.style.left = snakeX * GRID_SIZE + 'px';
    snake.style.top = snakeY * GRID_SIZE + 'px';

    food.style.left = foodX * GRID_SIZE + 'px';
    food.style.top = foodY * GRID_SIZE + 'px';
}

function increaseSpeed() {
    clearInterval(intervalId); // Clear the previous interval
    speed -= 5; // Increase speed by reducing interval time
    intervalId = setInterval(update, speed);
}

function gameOver() {
    gameRunning = false;
    startButton.style.display = 'block';
    restartButton.style.display = 'block'; // Display restart button after game over
    resetGame();
}

function resetGame() {
    clearInterval(intervalId);
    snakeX = 10;
    snakeY = 10;
    foodX = 5;
    foodY = 5;
    xVelocity = 0;
    yVelocity = 0;
    score = 0;
    scoreDisplay.textContent = score;
    speed = INITIAL_SPEED;
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (yVelocity !== 1) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case 'ArrowDown':
        case 's':
            if (yVelocity !== -1) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
        case 'ArrowLeft':
        case 'a':
            if (xVelocity !== 1) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (xVelocity !== -1) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
    }
});

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
    resetGame();
    startGame();
});

// Display the highest score
highScoreDisplay.textContent = highestScore;