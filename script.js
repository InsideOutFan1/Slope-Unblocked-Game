// Get canvas element and its 2D context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 600;
canvas.height = 400;

// Game variables
let playerX = canvas.width / 2;
let playerY = 50;
let playerSize = 10;
let playerSpeed = 5;
let playerColor = '#ff6347';

let obstacleWidth = 100;
let obstacleHeight = 20;
let obstacleSpeed = 3;
let obstacles = [];

let gameOver = false;
let score = 0;

// Function to update game state
function update() {
    if (!gameOver) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Move obstacles
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].y += obstacleSpeed;
            
            // Check collision with player
            if (obstacles[i].y + obstacleHeight > playerY &&
                obstacles[i].y < playerY + playerSize &&
                obstacles[i].x + obstacleWidth > playerX &&
                obstacles[i].x < playerX + playerSize) {
                gameOver = true;
            }
            
            // Remove obstacles that have gone off screen
            if (obstacles[i].y > canvas.height) {
                obstacles.splice(i, 1);
                score++;
            }
        }
        
        // Generate new obstacle
        if (Math.random() < 0.02) {
            let obstacleX = Math.random() * (canvas.width - obstacleWidth);
            obstacles.push({ x: obstacleX, y: -obstacleHeight });
        }
        
        // Draw player
        ctx.fillStyle = playerColor;
        ctx.fillRect(playerX, playerY, playerSize, playerSize);
        
        // Draw obstacles
        ctx.fillStyle = '#008080';
        for (let obstacle of obstacles) {
            ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
        }
        
        // Display score
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);
    } else {
        // Game over screen
        ctx.fillStyle = '#ffffff';
        ctx.font = '36px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Function to handle player input
function keyDownHandler(e) {
    if (e.key === 'ArrowLeft') {
        playerX -= playerSpeed;
    } else if (e.key === 'ArrowRight') {
        playerX += playerSpeed;
    }
}

// Event listener for keyboard input
document.addEventListener('keydown', keyDownHandler);

// Game loop
setInterval(update, 1000 / 60); // 60 FPS
