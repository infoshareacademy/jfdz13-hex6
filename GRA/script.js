

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

// console.log(playerPositionY);

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
        }else{
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
        }else{
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


const generateRandomNumber = (size) => {
    const randomNumber = Math.floor(Math.random() * 1500);

    if (randomNumber < size) {
        return randomNumber; 
    } else {
        return generateRandomNumber(size);
    }
};

const createNewBuilding = () => {
    const building = document.createElement('div');
    world.appendChild(building);
    building.className = 'building';

    buildingMaxHeight = worldHeight - playerHeight;

    building.style.height = `${generateRandomNumber(buildingMaxHeight)}px`;

    building.style.left = `${generateRandomNumber(worldWidth)}px`;

    world.appendChild(building);
};

const addNewBuilding = () => {
   const numberOfBuildings =  document.getElementsByClassName('building');
   if (numberOfBuildings.length < 5) {
        createNewBuilding();
        addNewBuilding();
   } 
}

addNewBuilding();
