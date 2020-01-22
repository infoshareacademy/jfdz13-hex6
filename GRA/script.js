

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

let playerSpeedX = 80;
let playerSpeedY = 20;

let playerPositionX = parseInt(window.getComputedStyle(player).left);
let playerPositionY = parseInt(window.getComputedStyle(player).top);


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
function step() {
    getDeltaTime();
    stopId = requestAnimationFrame(step);
    if (toggle) {
        playerPositionX += 0.01 * playerSpeedX * dTime;
        seagull.style.left = playerPositionX + 'px';
    } else {
        cancelAnimationFrame(stopId);
    }
}
window.addEventListener('keydown', event => {
    if (event.code === flyRight) {
        document.getElementById('player-movement').className = 'player-movement flyRight';
        getDeltaTime();
        toggle = true;
        requestAnimationFrame(step);
    }
});
window.addEventListener('keyup', event => {
    if (event.code === flyRight) {
        document.getElementById('player-movement').className = 'player-movement flyRight';
        toggle = false;
        getDeltaTime();
    }
});

// let start;
// let stopId;
// let progress;
// let toggle = false;


// let time = Date.now();
// function step() {
//     const dTime = Date.now() - time;
//     time = Date.now();
//     if (toggle) {
//         playerPositionX += 0.01 * playerSpeedX * dTime;
//         player.style.left = playerPositionX + 'px';
//     }
//     stopId = window.requestAnimationFrame(step);
// }
// step();

// window.addEventListener('keydown', event => {

//     if (event.code === flyRight) {
//         document.getElementById('player-movement').className = 'player-movement flyRight';
//         toggle = true;
//         window.requestAnimationFrame(step);
//     }

// });


// window.addEventListener('keyup', event => {
//     if (event.code === flyRight) {
//         document.getElementById('player-movement').className = 'player-movement flyRight';
//         toggle = false;
//         cancelAnimationFrame(stopId);

//     }

// });


//nowe chodzenie mniej skokowe

// let moveKey = 0;
// let moveTime = 0 ;
// let frames = 10;
// let second = 60;
// let fps = second/frames;


// window.addEventListener('keydown', event => {

//             if (event.code === flyRight) {
//                 document.getElementById('player-movement').className = 'player-movement flyRight';
//                 moveRight();
//             }

//             if (event.code === flyLeft) {
//                 document.getElementById('player-movement').className = 'player-movement flyLeft';
//                 moveLeft();
//             }

//             if (event.code === flyUp) {
//                 moveUp();
//             }

//             if (event.code === flyDown) {
//                 moveDown();
//             }

// });


// function moveRight() {
//     clearTimeout(moveTime);
//         moveTime = setTimeout(function(){
//         clearInterval(moveKey);
//     },second);        

//     clearInterval(moveKey);
//     moveKey = setInterval(function(){
//         playerPositionX = playerPositionX + (60 / frames);
//         player.style.left = playerPositionX + "px";      
//     },fps);

//     return false;
// }

// function moveLeft() {
//     clearTimeout(moveTime);
//         moveTime = setTimeout(function(){
//         clearInterval(moveKey);
//     },second);        

//     clearInterval(moveKey);
//     moveKey = setInterval(function(){
//         playerPositionX = playerPositionX - (60 / frames);
//         player.style.left = playerPositionX + "px";      
//     },fps);

//     return false;
// }

// function moveUp() {
//     clearTimeout(moveTime);
//         moveTime = setTimeout(function(){
//         clearInterval(moveKey);
//     },second);        

//     clearInterval(moveKey);
//     moveKey = setInterval(function(){
//         playerPositionY = playerPositionY - (60 / frames);
//         player.style.top = playerPositionY + "px";      
//     },fps);

//     return false;
// }

// function moveDown() {
//     clearTimeout(moveTime);
//         moveTime = setTimeout(function(){
//         clearInterval(moveKey);
//     },second);        

//     clearInterval(moveKey);
//     moveKey = setInterval(function(){
//         playerPositionY = playerPositionY + (60 / frames);
//         player.style.top = playerPositionY + "px";      
//     },fps);
//     return false;
// }


//stare chodzenie skokowe bardzo

// window.addEventListener('keydown', event => {

//         if (event.code === flyRight) {
//             document.getElementById('player-movement').className = 'player-movement flyRight';
//             if (playerPositionX + playerWidth + playerSpeedX <= worldWidth) {
//             playerPositionX += playerSpeedX; 
//             player.style.left = `${playerPositionX}px`;   
//             }else{
//             let playerActualPossitionX = parseInt(window.getComputedStyle(player).left);
//             playerNewSpeedX = worldWidth - playerActualPossitionX - playerWidth;
//             playerActualPossitionX += playerNewSpeedX; 
//             player.style.left = `${playerActualPossitionX}px`;
//             } 
//         }

//         if (event.code === flyLeft) {
//             document.getElementById('player-movement').className = 'player-movement flyLeft';
//             if (playerPositionX >= playerSpeedX) {
//                 playerPositionX -= playerSpeedX;
//                 player.style.left = `${playerPositionX}px`;   
//             }else{
//                 let playerActualPossitionX = parseInt(window.getComputedStyle(player).left);
//                 playerNewSpeedX = playerActualPossitionX;
//                 playerActualPossitionX -= playerNewSpeedX; 
//                 player.style.left = `${playerActualPossitionX}px`;
//             } 
//         }

//         if (event.code === flyUp) {
//             document.getElementById('player-movement').className = 'player-movement flyRightUp';
//             if (playerPositionY >= playerSpeedY) {
//                 playerPositionY -= playerSpeedY;
//                 player.style.top = `${playerPositionY}px`;
//             }else{
//                 let playerActualPositionY = parseInt(window.getComputedStyle(player).top);
//                 playerNewSpeedY = playerActualPositionY;
//                 playerActualPositionY += playerNewSpeedY; 
//                 player.style.top = `${playerActualPositionY}px`;
//             }
//         }


//         if (event.code === flyDown) {
//             document.getElementById('player-movement').className = 'player-movement flyRightDown';
//             if (playerPositionY + playerHeight + playerSpeedY <= worldHeight) {
//                 playerPositionY += playerSpeedY;
//                 player.style.top = `${playerPositionY}px`;
//             }else{
//                 let playerActualPositionY = parseInt(window.getComputedStyle(player).top);
//                 playerNewSpeedY = worldHeight - playerActualPositionY - playerHeight;
//                 playerActualPositionY += playerNewSpeedY; 
//                 player.style.top = `${playerActualPositionY}px`;
//             }
//         }
        


// });



// window.addEventListener('keyup', event => {
//     if (event.code === flyLeft) {
//         document.getElementById('player-movement').className = 'player-movement flyRight';

//     }

//     if (event.code === flyUp) {
//         document.getElementById('player-movement').className = 'player-movement flyRight';
//     }

//     if (event.code === flyDown) {
//         document.getElementById('player-movement').className = 'player-movement flyRight';
//     }
// });


