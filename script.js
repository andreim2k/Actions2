const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [];
let food = {};
let score = 0;
let d;
let game;
let gameOver = false;

function init() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };

    score = 0;
    d = undefined;
    gameOver = false;

    if (game) {
        clearInterval(game);
    }
    game = setInterval(draw, 100);
}

document.addEventListener('keydown', direction);

function direction(event) {
    if (gameOver && (event.key === ' ' || event.key === 'Enter')) {
        init();
        return;
    }

    if (event.key === 'ArrowLeft' && d !== 'RIGHT') {
        d = 'LEFT';
    } else if (event.key === 'ArrowUp' && d !== 'DOWN') {
        d = 'UP';
    } else if (event.key === 'ArrowRight' && d !== 'LEFT') {
        d = 'RIGHT';
    } else if (event.key === 'ArrowDown' && d !== 'UP') {
        d = 'DOWN';
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = '20px Arial';
    ctx.fillText('Press Space or Enter to Restart', canvas.width / 2, canvas.height / 2 + 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        gameOver = true;
        drawGameOver();
        return;
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'black';
    ctx.font = '40px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

init();
