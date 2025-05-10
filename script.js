// Object and Constants
let inputDirection = {x:0, y:0};
const gameMusic = new Audio("Asset/music.mp3");
const moveMusic = new Audio("Asset/move.mp3");
const foodMusic = new Audio("Asset/food.mp3");
const gameoverMusic = new Audio("Asset/gameover.mp3");

// Variables, Array and Object
let score = 0;
let speed = 5;
let lastPaintTime = 0;

// Here, x represents 'column' and y represents 'row'
let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};

// Functions
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime) / 1000 < 1/speed){ // This condition checks that does enough time has passed sinces last animation
        return;
    }
    lastPaintTime = currentTime; // Updating the last performed animation time
    gameEngine();
}

function isCollide(snake){
    // If snake collides with itself
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If snake collides with boundary around it
    if(snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18){
        return true;
    }
    return false;
}

function gameEngine(){
    // Updating snake array (snake creation) and food
    if(isCollide(snakeArr)){
        moveMusic.pause();
        gameoverMusic.play();
        alert("Game Over!!!\nPress any key to Play Again");
        inputDirection = {x:0, y:0};
        snakeArr = [{x:13, y:15}];
        food = {x:6, y:7};
        score = 0; 
        document.querySelector(".scroeBox").innerHTML = "Score: " + score;
    }

    // If snake eats food, update score, increase the length of snake and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodMusic.play();
        score = score + 1;
        document.querySelector(".scroeBox").innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        let a = 2; // It is assumed as the starting point of grid
        let b = 16; // It is assumed as the ending point of grid
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
        // Through above equation we are generating a random number between a and b for y(row) and x(column) to plcae food into new position.
    }

    // Moving snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x = snakeArr[0].x + inputDirection.x;
    snakeArr[0].y = snakeArr[0].y + inputDirection.y;

    // Displaying the snake and food
    // Create and Display Snake
    let gameInterface = document.querySelector(".board");
    gameInterface.innerHTML = "";
    snakeArr.forEach(function(pos, index){
        let snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = pos.y;
        snakeElement.style.gridColumnStart = pos.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add("snake");
        }
        gameInterface.appendChild(snakeElement);
    })

    // Create and Display Food
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameInterface.appendChild(foodElement);
}


// Main Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (evtObj)=>{
    inputDirection = {x:0, y:1};
    moveMusic.play();
    
    if(evtObj.key === "ArrowUp"){
        inputDirection.x = 0;
        inputDirection.y = -1;
    }
    if(evtObj.key === "ArrowDown"){
        inputDirection.x = 0;
        inputDirection.y = 1;
    }
    if(evtObj.key === "ArrowLeft"){
        inputDirection.x = -1;
        inputDirection.y = 0;
    }
    if(evtObj.key === "ArrowRight"){
        inputDirection.x = 1;
        inputDirection.y = 0;
    }
})