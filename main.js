'use strict';
// PODAJ LICZBĘ RZĘDÓW I KOLUMN:
let cols = 10;
let rows = 10;

// ------------------------------------

let gameContainer = document.getElementById('game-container');

let containerWidth = cols*100;
gameContainer.style.width = `${containerWidth}px`;

let containerHeight = rows*100;
gameContainer.style.height = `${containerHeight}px`;


let gamePanelsArray = [];
let indexIterator = 0; 

for (let i = 0; i < rows; i++) {
    let arrayRow = [];
    for (let j = 0; j < cols; j++) {
        let singleGamePanel = document.createElement('div');
        singleGamePanel.classList.add('single-panel');
        singleGamePanel.id = `element-${indexIterator}`;
        gameContainer.appendChild(singleGamePanel);
        arrayRow.push(singleGamePanel);
        indexIterator++;
    }
    gamePanelsArray.push(arrayRow);
}

console.log(gamePanelsArray);

// MUSHROOMS
let mushrooms = []
for(let i = 0; i<Math.floor((cols*rows)/2);i++){
     mushrooms[i] = document.querySelector(`#element-${Math.floor(Math.random() * rows*cols)}`);
     mushrooms[i].style.backgroundColor='red'
}
// console.log(mushrooms)


// GAME ENGINE

let playerPos = [0, 0];
gamePanelsArray[playerPos[0]][playerPos[1]].style.backgroundColor = 'yellow';


let isWin = false;
let pressedKey = 0

document.addEventListener('keydown', (e) => {
    if (isWin == false) {
        pressedKey = e.code;

        switch (pressedKey) {
            case 'ArrowLeft':
                if (playerPos[1] != 0) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].style.backgroundColor = 'green';
                    playerPos[1]--;
                    break;
                } else {
                    break;
                }
                
            case 'ArrowUp':
                if (playerPos[0] != 0) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].style.backgroundColor = 'green';
                    playerPos[0]--;
                    break;
                } else {
                    break;
                }
                
            case 'ArrowRight':
                if (playerPos[1] != cols-1) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].style.backgroundColor = 'green';
                    playerPos[1]++;
                    break;
                } else {
                    break;
                }
                
            case 'ArrowDown':
                if (playerPos[0] != rows-1) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].style.backgroundColor = 'green';
                    playerPos[0]++;
                    break;
                } else {
                    break;
                }
        
            default:
                break;
        }
        
        gamePanelsArray[playerPos[0]][playerPos[1]].style.backgroundColor = 'yellow';
    } else {
        console.log('Wygrałeś!');
    }
});