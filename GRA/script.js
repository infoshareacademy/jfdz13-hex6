//WORLD
const world = document.querySelector('#world');
const worldWidth = parseInt(window.getComputedStyle(world).width);
const worldHeight = parseInt(window.getComputedStyle(world).height);


//PLAYER
const player = document.querySelector('#player');
const playerWidth = parseInt(window.getComputedStyle(player).width);
const playerHeight = parseInt(window.getComputedStyle(player).height);

const flyRight = 'ArrowRight';
const flyLeft = 'ArrowLeft';
const flyUp = 'ArrowUp';
const flyDown = 'ArrowDown';

let playerSpeedX = 30;
let playerSpeedY = 50;

let playerPositionX = parseInt(window.getComputedStyle(player).left);
let playerPositionY = parseInt(window.getComputedStyle(player).top);



// SCORE 

let score = 0;

const scoreDiv = document.createElement('div');
world.appendChild(scoreDiv);
scoreDiv.className = 'score';
scoreDiv.innerText = `Wynik: ${score}`;

updateScoreView = () => {
    scoreDiv.innerText = `Wynik: ${score}`;
};


//PLAYER moving
window.addEventListener('keydown', event => {

    if (event.code === flyRight) {
        document.getElementById('player-movement').className = 'player-movement flyRight';
        if (playerPositionX + playerWidth + playerSpeedX <= worldWidth) {
        playerPositionX += playerSpeedX; 
        player.style.left = `${playerPositionX}px`;   
        }else{
        let playerActualPossitionX = parseInt(window.getComputedStyle(player).left);
        playerNewSpeedX = worldWidth - playerActualPossitionX - playerWidth;
        playerActualPossitionX += playerNewSpeedX; 
        player.style.left = `${playerActualPossitionX}px`;
        } 
    }

    if (event.code === flyLeft) {
        document.getElementById('player-movement').className = 'player-movement flyLeft';
        if (playerPositionX >= playerSpeedX) {
            playerPositionX -= playerSpeedX;
            player.style.left = `${playerPositionX}px`;   
        }else{
            let playerActualPossitionX = parseInt(window.getComputedStyle(player).left);
            playerNewSpeedX = playerActualPossitionX;
            playerActualPossitionX -= playerNewSpeedX; 
            player.style.left = `${playerActualPossitionX}px`;
        } 
    }

    if (event.code === flyUp) {
        document.getElementById('player-movement').className = 'player-movement flyRightUp';
        if (playerPositionY >= playerSpeedY) {
            playerPositionY -= playerSpeedY;
            player.style.top = `${playerPositionY}px`;
        } else {
            let playerActualPositionY = parseInt(window.getComputedStyle(player).top);
            playerNewSpeedY = playerActualPositionY;
            playerActualPositionY += playerNewSpeedY; 
            player.style.top = `${playerActualPositionY}px`;
        }
    }


    if (event.code === flyDown) {
        document.getElementById('player-movement').className = 'player-movement flyRightDown';
        if (playerPositionY + playerHeight + playerSpeedY <= worldHeight) {
            playerPositionY += playerSpeedY;
            player.style.top = `${playerPositionY}px`;
        } else {
            let playerActualPositionY = parseInt(window.getComputedStyle(player).top);
            playerNewSpeedY = worldHeight - playerActualPositionY - playerHeight;
            playerActualPositionY += playerNewSpeedY; 
            player.style.top = `${playerActualPositionY}px`;
        }
       
    }

});

window.addEventListener('keyup', event => {
    if (event.code === flyLeft) {
        document.getElementById('player-movement').className = 'player-movement flyRight';

    }

    if (event.code === flyUp) {
        document.getElementById('player-movement').className = 'player-movement flyRight';
    }

    if (event.code === flyDown) {
        document.getElementById('player-movement').className = 'player-movement flyRight';
    }
});

//OBSTACLES

const buildingList = [];

const generateRandomNumber = (MaxSize, MinSize, multiplier) => {
    const randomNumber = Math.floor(Math.random() * multiplier);

    if (randomNumber < MaxSize && randomNumber > MinSize) {
        return randomNumber; 
    } else {
        return generateRandomNumber(MaxSize, MinSize);
    }
};

const createNewObstacle = (obstacleType, maxHeight, minHeight) => {
    
    const obstacle = document.createElement('div');
    
    obstacle.className = obstacleType;

    const obstacleHeight = generateRandomNumber(maxHeight, minHeight, multiplier);
    obstacle.style.height = `${obstacleHeight}px`;
    obstacle.style.left = `${1200}px`;

    world.appendChild(obstacle);
    
    const movingObstacle = setInterval ( () =>  {
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).left);
        let newObstacleLeft = obstacleLeft - 1;
        obstacle.style.left = `${newObstacleLeft}px`
        stopMovingObstacle(newObstacleLeft);
    }, 10);

    const stopMovingObstacle = (newObstacleLeft) => {
        if(newObstacleLeft < 0) {
            obstacle.remove();
            addNewObstacle();
        };
    };
};

const addNewObstacle = () => {
    const numberOfObstacles =  document.getElementsByClassName('type');
        if (numberOfObstacles.length < 1) {
            createNewObstacle();
            addNewObstacle();
        } 
}

obstacleType1 = 'lamp';
obstacleType2 = 'tree';
obstacleType3 = 'pigeon';

// jak wygenerować gołębia?
// przez określenie granic wysokości gołebia na 30-90px funkcja generateRandomNumber nie moze wygenerowac losowej liczby
// dodanie multiplier który w zaleności od wielkości obiektu miałby nadawać odpowiedni mnoznik w funkcji generateRandomNumber() nie działa
//jak to obejść?

setInterval (() => {
    createNewObstacle(obstacleType1, 350, 200, 500);
}, 8000);

setInterval (() => {
    createNewObstacle(obstacleType2, 600, 400, 300);
}, 11000);

setInterval (() => {
    createNewObstacle(obstacleType3, 30, 90, 100);
}, 5000);

// buildingList.push({left: buildingLeft, height: buildingHeight});



// const building = document.querySelector('.building');
// const buildingWidth = parseInt(window.getComputedStyle(building).width);
// const buildingLeft = parseInt(window.getComputedStyle(building).left);


// const collisionFunction = () => {
//         // if (playerPositionX + playerWidth >= buildingLeft &&
//         //     playerPositionX + playerWidth <= buildingLeft + buildingWidth) {
//         //         score -= 1;
//         if (buildingList.some(building => {
//             return playerPositionX + playerWidth >= building.left && 
//             playerPositionX + playerWidth <= building.left + buildingWidth &&
//             worldHeight - playerPositionY <= building.height
//         }))
//     score -= 1;
//     return score;
// };
    
// window.addEventListener('keydown', (event) => {
//     collisionFunction();
//     updateScoreView();
  
// });

