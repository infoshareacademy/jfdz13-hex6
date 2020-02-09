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

let playerSpeedX = 50;
let playerSpeedY = 50;

let playerPositionX = parseInt(window.getComputedStyle(player).left);
let playerPositionY = parseInt(window.getComputedStyle(player).top);

let sunbedList = [];
let treeList = [];
let pigeonList = [];

// SCORE 

let life = 3;

// const lifeDiv = document.createElement('div');
// world.appendChild(lifeDiv);
// lifeDiv.className = 'life';
// lifeDiv.innerText = `Życie: ${life}`;
// lifeDiv.style.top = '0';
// lifeDiv.style.right = '-100px';

updateLifeView = () => {
    // lifeDiv.innerText = `Życie: ${life}`;
    if (life === 3) {
        document.getElementById("heart").src = "images/life3.png";
    }
    if (life === 2) {
    document.getElementById("heart").src = "images/life2.png";
    }
    if (life === 1) {
    document.getElementById("heart").src = "images/life1.png";
    }
    if (life <= 0) {
        document.getElementById("heart").src = "images/life0.png";
    }
};



// *** GAME OVER *** //

const gameOverDiv = document.createElement('div');
    
gameOverDiv.className = 'gameOver';

const gameOverFunction = () => {
    if (life <= 0) {
        world.appendChild(gameOverDiv);
        player.remove();

    } 
}

//PLAYER moving

//chodzenie podejście 3 - requestAnimationFrame()

let stopId;
let toggle = false;
let time = Date.now();
let dTime;

const seagull = document.getElementById('player');
function getDeltaTime() {
    dTime = Date.now() - time;
    time = Date.now();
}
function movePlayerRight() {
    getDeltaTime();
    document.getElementById('player-movement').className = 'player-movement flyRight';
    stopId = requestAnimationFrame(movePlayerRight);
    if (toggle && playerPositionX + playerWidth + 0.01 * playerSpeedX * dTime <= worldWidth) {
        playerPositionX += 0.01 * playerSpeedX * dTime;
        seagull.style.left = playerPositionX + 'px';
    } else {
        cancelAnimationFrame(stopId);
    }
};

function movePlayerLeft() {
    getDeltaTime();
    document.getElementById('player-movement').className = 'player-movement flyRight';
    stopId = requestAnimationFrame(movePlayerLeft);
    if (toggle && playerPositionX >= 0.01 * playerSpeedX * dTime) {
        playerPositionX -= 0.01 * playerSpeedX * dTime;
        seagull.style.left = playerPositionX + 'px';
    } else {
        cancelAnimationFrame(stopId);
    }
};

function movePlayerUp() {
    getDeltaTime();
    stopId = requestAnimationFrame(movePlayerUp);
    if (toggle && playerPositionY >= 0.01 * playerSpeedY * dTime) {
        playerPositionY -= 0.01 * playerSpeedY * dTime;
        seagull.style.top = playerPositionY + 'px';
    } else {
        cancelAnimationFrame(stopId);
    }
};

function movePlayerDown() {
    getDeltaTime();
    stopId = requestAnimationFrame(movePlayerDown);
    if (toggle && playerPositionY + playerHeight + 0.01 * playerSpeedY * dTime <= worldHeight*2/3) {
        playerPositionY += 0.01 * playerSpeedY * dTime;
        seagull.style.top = playerPositionY + 'px';
    } else {
        cancelAnimationFrame(stopId);
    }
};


window.addEventListener('keydown', event => {
    if (event.code === flyRight) {
        getDeltaTime();
        toggle = true;
        requestAnimationFrame(movePlayerRight);
    }
    if (event.code === flyLeft) {
        getDeltaTime();
        toggle = true;
        requestAnimationFrame(movePlayerLeft);
    }
    if (event.code === flyUp) {
        getDeltaTime();
        toggle = true;
        requestAnimationFrame(movePlayerUp);
    }
    if (event.code === flyDown) {
        getDeltaTime();
        toggle = true;
        requestAnimationFrame(movePlayerDown);
    }
});
window.addEventListener('keyup', event => {
    if (event.code === flyRight || event.code === flyLeft  || event.code === flyUp || event.code === flyDown) {
        toggle = false;
        getDeltaTime();
    }
});



// ********* OBSTACLE GENERATOR ********** //
obstacleType1 = 'sunbed';
obstacleType2 = 'tree';

const sunbedHeight = [320, 310, 300, 290, 280, 270, 260, 250, 240, 230];
const treeHeight = [510, 500, 490, 470, 450, 440, 430, 400, 360, 350];
const pigeonTop = [10, 50, 60, 90, 140, 180, 260, 300, 340];

const generateObstacleHeight = (obstacleHeightArray) => {
    const arrayPosition = Math.floor(Math.random() * 10);
    return obstacleHeightArray[arrayPosition];
};

const createNewObstacle = (obstacleType, obstacleHeightArray) => {
    
    const obstacle = document.createElement('div');
    obstacle.className = obstacleType;
    const obstacleHeight = generateObstacleHeight(obstacleHeightArray);
    obstacle.style.height = `${obstacleHeight}px`;
    obstacle.style.left = `${worldWidth - 10}px`;
    const obstacleWidth = parseInt(window.getComputedStyle(obstacle).width)

    world.appendChild(obstacle);
    
    const movingObstacle = setInterval ( () =>  {
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).left);
        let newObstacleLeft = obstacleLeft - 1;
        obstacle.style.left = `${newObstacleLeft}px`
        stopMovingObstacle(newObstacleLeft);
    }, 10);

    const stopMovingObstacle = (newObstacleLeft) => {
        if(newObstacleLeft + 190 < 0) {
            obstacle.remove();
            createNewObstacle(obstacleType, obstacleHeightArray);
        };
    };
};

const sunbedInterval = setInterval (() => {
    let numberOfsunbeds =  document.getElementsByClassName('sunbed');
    if (numberOfsunbeds.length < 2) {
        createNewObstacle(obstacleType1, sunbedHeight);
   }
}, 5000);

const treeInterval = setInterval (() => {
    let numberOfTrees =  document.getElementsByClassName('tree');
    if (numberOfTrees.length < 3) {
        createNewObstacle(obstacleType2, sunbedHeight);
   }
}, 9000);


// ***** PIGEON GENERATOR *** //
obstacleType3 = 'pigeon';

const createNewPigeon = (obstacleType, obstacleTopArray) => {
    
    const obstacle = document.createElement('div');
    obstacle.className = obstacleType;

    obstacle.style.left = `${worldWidth - 10}px`;
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
        if(newObstacleLeft + 30 < 0) {
            obstacle.remove();
        };
    };
};

const pigeonInterval = setInterval (() => {
    const numberOfPigeons =  document.getElementsByClassName('pigeon');
    if (numberOfPigeons.length < 5) {
        createNewPigeon(obstacleType3, pigeonTop);
   }
}, 4000);



// ******* COLLISION ***** //

    // *** sunbed *** //

const getsunbedDimensions = () => {
    let sunbed = document.querySelector('.sunbed');

    if (sunbed === null) {
        return;
    }
        let sunbedWidth = parseInt(window.getComputedStyle(sunbed).width);
        let sunbedLeft = parseInt(window.getComputedStyle(sunbed).left);
        let sunbedHeight = parseInt(window.getComputedStyle(sunbed).height);

        sunbedList.push({left: sunbedLeft, height: sunbedHeight, width: sunbedWidth});
};

const hasCollisionWithsunbed = sunbed => {
    return playerPositionX + playerWidth >= sunbed.left && 
    playerPositionX  <= sunbed.left + sunbed.width &&
    worldHeight - playerPositionY <= sunbed.height
}

const collisionWithsunbedFunction = () => {
    sunbedList.some(sunbed => {
        if (hasCollisionWithsunbed(sunbed)) {
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
    getsunbedDimensions();
    getTreeDimensions();
    getPigeonDimensions();
    collisionWithsunbedFunction();
    collisionWithTreeFunction();
    collisionWithPigeonFunction();
    pigeonList = [];
    sunbedList = [];
    treeList = [];
    updateLifeView();
    gameOverFunction();
}, 1000);



//POO 


const shoot = ' ';

window.addEventListener("click", (event) => {
    playGame()
  })

function letShipFly(event) {
    if (event.key === " ") {
     event.preventDefault()
     fireLaser()
   }
 }

function fireLaser() {
    let laser = createLaserElement()
    world.appendChild(laser)
    moveLaser(laser)
  }


  function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(player).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = "images/fireball-1.png"
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition +20}px`
    newLaser.style.top = `${yPosition +80}px`
    return newLaser
  }
  

  function moveLaser(laser) {
    let laserInterval = setInterval(() => {
      let yPosition = parseInt(laser.style.top)
      if (yPosition === 700) {
        laser.remove()
      } else {
        laser.style.top = `${yPosition + 18}px`
      }
    },50)
  }
  

  function playGame(){
    window.addEventListener("keydown", letShipFly)
  }



const createNewAim = (aimType) => {
    const aim = document.createElement('div');
    aim.className = aimType;
    aim.style.left = `${-250}px`;
    world.appendChild(aim);

    const movingAim = setInterval ( () =>  {
        const AimLeft = parseInt(window.getComputedStyle(aim).left);
        let newAimLeft = AimLeft + 2;
       aim.style.left = `${newAimLeft}px`
        stopMovingAim(newAimLeft);
     }, 10);

    const stopMovingAim = (newAimLeft) => {
        if(newAimLeft > 900) {
            aim.remove();
            createNewAim(aimType);
        };
    };
};


const createNewAim2 = (aimType) => {
    const aim = document.createElement('div');
    aim.className = aimType;
    aim.style.left = `${900}px`;
    world.appendChild(aim);

    const movingAim = setInterval ( () =>  {
        const AimLeft = parseInt(window.getComputedStyle(aim).left);
        let newAimLeft = AimLeft - 1.2;
       aim.style.left = `${newAimLeft}px`
        stopMovingAim(newAimLeft);
     }, 10);

    const stopMovingAim = (newAimLeft) => {
        if(newAimLeft < -250) {
            aim.remove();
            createNewAim2(aimType);
        };
    };
};

const createNewAim3 = (aimType) => {
    const aim = document.createElement('div');
    aim.className = aimType;
    aim.style.left = `${900}px`;
    world.appendChild(aim);

    const movingAim = setInterval ( () =>  {
        const AimLeft = parseInt(window.getComputedStyle(aim).left);
        let newAimLeft = AimLeft - 5;
       aim.style.left = `${newAimLeft}px`
        stopMovingAim(newAimLeft);
     }, 10);

    const stopMovingAim = (newAimLeft) => {
        if(newAimLeft < -250) {
            aim.remove();
            createNewAim3(aimType);
        };
    };
};



//AIMS 

aimType1 = 'girl';
aimType2 = 'man';
aimType3 = 'car';

const girlInterval = setInterval (() => {
    const numberOfAims =  document.getElementsByClassName('man');
    if (numberOfAims.length < 2) {
        createNewAim(aimType2);
   }
}, 6000);



const manInterval = setInterval (() => {
    const numberOfAims =  document.getElementsByClassName('girl');
    if (numberOfAims.length < 2) {
        createNewAim2(aimType1);
   }
}, 10000);

const carInterval = setInterval (() => {
    const numberOfAims =  document.getElementsByClassName('car');
    if (numberOfAims.length < 2) {
        createNewAim3(aimType3);
   }
}, 15000);
