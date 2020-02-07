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

let lampList = [];
let treeList = [];
let pigeonList = [];

// SCORE 

let life = 1;

const lifeDiv = document.createElement('div');
world.appendChild(lifeDiv);
lifeDiv.className = 'life';
lifeDiv.innerText = `Życie: ${life}`;

updateLifeView = () => {
    lifeDiv.innerText = `Życie: ${life}`;
};

// *** GAME OVER *** //

const gameOverDiv = document.createElement('div');
    
gameOverDiv.className = 'gameOver';

const gameOverFunction = () => {
    if (life <= 0) {
        world.appendChild(gameOverDiv);
        player.remove();
        clearInterval(lampInterval);

    } 
}

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

// ********* OBSTACLE GENERATOR ********** //
obstacleType1 = 'lamp';
obstacleType2 = 'tree';

const lampHeight = [350, 320, 300, 270, 260, 250, 240, 220, 200, 180];
const treeHeight = [510, 500, 490, 470, 450, 440, 430, 400, 360, 350];
const pigeonTop = [10, 50, 60, 90, 140, 180, 260, 300, 340, 370];

const generateObstacleHeight = (obstacleHeightArray) => {
    const arrayPosition = Math.floor(Math.random() * 10);
    return obstacleHeightArray[arrayPosition];
};

const createNewObstacle = (obstacleType, obstacleHeightArray) => {
    
    const obstacle = document.createElement('div');
    obstacle.className = obstacleType;
    const obstacleHeight = generateObstacleHeight(obstacleHeightArray);
    obstacle.style.height = `${obstacleHeight}px`;
    obstacle.style.left = `${810}px`;

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
            createNewObstacle(obstacleType, obstacleHeightArray);
        };
    };
};

const lampInterval = setInterval (() => {
    let numberOfLamps =  document.getElementsByClassName('lamp');
    if (numberOfLamps.length < 3) {
        createNewObstacle(obstacleType1, lampHeight);
   }
}, 5000);

const treeInterval = setInterval (() => {
    let numberOfTrees =  document.getElementsByClassName('tree');
    if (numberOfTrees.length < 3) {
        createNewObstacle(obstacleType2, lampHeight);
   }
}, 8000);


// ***** PIGEON GENERATOR *** //
obstacleType3 = 'pigeon';

const createNewPigeon = (obstacleType, obstacleTopArray) => {
    
    const obstacle = document.createElement('div');
    obstacle.className = obstacleType;

    obstacle.style.left = `${810}px`;
    const obstacleTop = generateObstacleHeight(obstacleTopArray);
    obstacle.style.top = `${obstacleTop}px`;

    world.appendChild(obstacle);

    const pigeonAnimation = document.createElement('img');
    pigeonAnimation.className = 'pigeon-movement';
    pigeonAnimation.setAttribute('src', 'images/flying-pigey_whiteOnly.png');

    obstacle.appendChild(pigeonAnimation);
    
    const movingPigeon = setInterval ( () =>  {
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).left);
        let newObstacleLeft = obstacleLeft - 1;
        obstacle.style.left = `${newObstacleLeft}px`
        stopMovingPigeon(newObstacleLeft);
    }, 10);

    const stopMovingPigeon = (newObstacleLeft) => {
        if(newObstacleLeft < 0) {
            obstacle.remove();
        };
    };
};

const pigeonInterval = setInterval (() => {
    const numberOfPigeons =  document.getElementsByClassName('pigeon');
    if (numberOfPigeons.length < 4) {
        createNewPigeon(obstacleType3, pigeonTop);
   }
}, 4000);


// ******* COLLISION ***** //

    // *** LAMP *** //

const getLampDimensions = () => {
    let lamp = document.querySelector('.lamp');

    if (lamp === null) {
        return;
    }
        let lampWidth = parseInt(window.getComputedStyle(lamp).width);
        let lampLeft = parseInt(window.getComputedStyle(lamp).left);
        let lampHeight = parseInt(window.getComputedStyle(lamp).height);

        lampList.push({left: lampLeft, height: lampHeight, width: lampWidth});
};

const hasCollisionWithLamp = lamp => {
    return playerPositionX + playerWidth >= lamp.left && 
    playerPositionX  <= lamp.left + lamp.width &&
    worldHeight - playerPositionY <= lamp.height
}

const collisionWithLampFunction = () => {
    lampList.some(lamp => {
        if (hasCollisionWithLamp(lamp)) {
            return life -= 1;
        }   
    })   
};

    // *** TREE *** //
const getTreeDimensions = () => {
    let tree = document.querySelector('.tree');

    if (tree === null) {
        return;
    }
        let treeWidth = parseInt(window.getComputedStyle(tree).width);
        let treeLeft = parseInt(window.getComputedStyle(tree).left);
        let treeHeight = parseInt(window.getComputedStyle(tree).height);

        treeList.push({left: treeLeft, height: treeHeight, width: treeWidth});
};
    
const hasCollisionWithTree = tree => {
    return playerPositionX + playerWidth >= tree.left && 
    playerPositionX  <= tree.left + tree.width &&
    worldHeight - playerPositionY <= tree.height
}

const collisionWithTreeFunction = () => {
    treeList.some(tree => {
        if (hasCollisionWithTree(tree)) {
            return life -= 1;
        }   
    })   
};  

    // *** PIGEON *** //
const getPigeonDimensions = () => {
    let pigeon = document.querySelector('.pigeon');

    if (pigeon === null) {
        return;
    }
        let pigeonWidth = parseInt(window.getComputedStyle(pigeon).width);
        let pigeonLeft = parseInt(window.getComputedStyle(pigeon).left);
        let pigeonHeight = parseInt(window.getComputedStyle(pigeon).height);
        let pigeonTop = parseInt(window.getComputedStyle(pigeon).top);

        pigeonList.push({left: pigeonLeft, top: pigeonTop, height: pigeonHeight, width: pigeonWidth});
};
    
const hasCollisionWithPigeon = pigeon => {
    return playerPositionX + playerWidth >= pigeon.left && 
    playerPositionX  <= pigeon.left + pigeon.width &&
    playerPositionY + playerHeight >= pigeon.top && 
    playerPositionY <= pigeon.top + pigeon.height
}

const collisionWithPigeonFunction = () => {
    pigeonList.some(pigeon => {
        if (hasCollisionWithPigeon(pigeon)) {
            return life -= 1;
        }   
    })   
};

const refreshFunction = setInterval(() => {
    getLampDimensions();
    getTreeDimensions();
    getPigeonDimensions();
    collisionWithLampFunction();
    collisionWithTreeFunction();
    collisionWithPigeonFunction();
    pigeonList = [];
    lampList = [];
    treeList = [];
    updateLifeView();
    gameOverFunction();
}, 1000);