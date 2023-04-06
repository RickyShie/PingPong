const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
const ballRadius = 10;

const paddleHeight = 100;
const paddleWidth = 10;
let paddleY = (canvas.height - paddleHeight) / 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX - ballRadius < 0 || (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX + ballRadius > canvas.width) {
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedY = 4;
}

function movePaddle(evt) {
    const mouseY = evt.clientY;
    paddleY = mouseY - canvas.offsetTop - paddleHeight / 2;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    moveBall();
}

canvas.addEventListener("mousemove", movePaddle);

setInterval(draw, 1000 / 60); // 60 FPS
