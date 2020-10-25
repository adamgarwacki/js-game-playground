'use strict';

// PODAJ LICZBĘ RZĘDÓW I KOLUMN:
let cols = 5;
let rows = 5;

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
        let singlePanelObject = {}
        let singleGamePanel = document.createElement('div');
        singleGamePanel.classList.add('single-panel');

        // singleGamePanel.id = `element-index-${indexIterator}`;


        singlePanelObject.panelId = singleGamePanel;


        gameContainer.appendChild(singleGamePanel);

        arrayRow.push(singlePanelObject);
        indexIterator++;
    }
    gamePanelsArray.push(arrayRow);
}

console.log(gamePanelsArray);


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