const playBoard = document.querySelector('.play-board');
const ScoreElement = document.querySelector('.score');
const HighScoreElement = document.querySelector('.high-score');
const Controls = document.querySelectorAll('.controls i');
const GameOver = document.querySelector('.gameover');

let gameOver = false;
let setIntervalId;
let foodX, foodY;
let snakeX = 10, snakeY = 16;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let score = 0;


let highScore = localStorage.getItem('high-score') || 0;
HighScoreElement.innerText = `High Score : ${highScore}`;

const ChangeFoodPosition = (e) => {

    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const gameOverHandler = () => {
    clearInterval(setIntervalId);
    GameOver.innerHTML = `<div class="gameover" style="gameover"> Game Over! </div>`;
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1; 
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;   
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;   
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;   
    }
}

Controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({key: key.dataset.key}));
});

const GameInit = () => {
    if(gameOver) return gameOverHandler();
    let htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"></div>`;
    
    if(snakeX === foodX && snakeY === foodY){
        ChangeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore  ? score : highScore;
        localStorage.setItem('high-score', highScore);

        ScoreElement.innerText = `Score : ${score}`;
    }

    for(let i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <=0 || snakeX >30 || snakeY <=0 || snakeY>30){
        gameOver = true;
    }


    for(let i = 0; i< snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i!==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;

}

ChangeFoodPosition();
setIntervalId = setInterval(GameInit, 130);
document.addEventListener("keydown", changeDirection);