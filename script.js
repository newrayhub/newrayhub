// variables
let foodSound = new Audio('food.wav');
let moveSound = new Audio('move.wav');
let gameOverSound = new Audio('gameover.wav');
let backSound = new Audio('back.mp3');


let inputDir = { x: 0, y: 0 };
let speed =10;
let lastPaintTime = 0;
let snakeArr = [
    { x: 22, y: 15}
]
food = { x: 7, y: 8 }

let score=  0;


//game functions

function main(ctime) {

    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();

}

function isCollide(snake){
// if  you bump into yourself
for (let j = 1; j < snakeArr.length; j++) {
    if (snake[j].x === snake[0].x && snake[j].y === snake[0].y) {
        return true;     
    }
}
// if you bump into the wall
if(snake[0].x >=32 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {
    return true;
}
}

function gameEngine() {
    //Part 1: Updating the snake 
if(isCollide(snakeArr)){
    backSound.pause();
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game over! Press any key to play again");
    snakeArr = [ { x: 13, y: 15 }];
    score = 0;

}

// if you have eaten the food then add food and increse the score
if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
    score +=1;
    if(score>highscoreval){
        highscoreval = score;
        localStorage.setItem("highscore",JSON.stringify(highscoreval));
        highscoreBox.innerHTML = "Highscore:" +highscoreval;
    }
    scoreBox.innerHTML="Score:"+ score;
    let a = 2;
    let b = 30;
    let c = 2;
    let d = 24;
    food = {x:Math.round(a + (b-a)*Math.random()),y:Math.round(c + (d-c)*Math.random())};
    scoreBox= document.create.createElement('div');
    scoreBox.classList.add('scoreBox');
}

// moving the snake
for (let i = snakeArr.length - 2; i >=0; i--) {
    // const element = snakeArr[i];
    snakeArr[i+1] = {...snakeArr[i]};

}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;



    // Render the snake the snake and food 
    board.innerHTML = "";
    //to display snake
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if (index === 0) {
            snakeElement.classList.add('head');
            // snakeElement.innerHTML ="Head";
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    // displaying the food
    snakeArr.forEach((e, index) => {
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
        // foodElement.innerHTML = "Food";

    });

}


//main logic
let highscore = localStorage.getItem("highscore");
if (highscore ===  null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "Highscore:" +highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = { x: 0, y: 1 };
backSound.play();
    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            moveSound.play();
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            moveSound.play();
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            moveSound.play();
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
           
        default:
            break;
    }

});
