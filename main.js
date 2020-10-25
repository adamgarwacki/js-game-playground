'use strict';

// PARAMETRY GRY:

let cols = 5;
let rows = 5;

let objectiveCount = 3;
let victoryCount = objectiveCount;

let playerPos = [0, 0];


// ALERT NA WYPADEK NIEWŁAŚCIWEJ ILOŚCI KOLUMN:

if (((rows * cols) - 1) < objectiveCount) {
    alert('UWAGA! ZA MAŁO PÓL - WEJDZIE NIESKOŃCZONA PĘTLA!!!!!!!');
    objectiveCount = 0
}


// ------------------------------------

let gameContainer = document.getElementById('game-container');

let containerWidth = cols * 100;
gameContainer.style.width = `${containerWidth}px`;
let containerHeight = rows * 100;
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
        singlePanelObject.isObjective = false;
        singlePanelObject.isObstacle = false;


        gameContainer.appendChild(singleGamePanel);

        arrayRow.push(singlePanelObject);
        indexIterator++;
    }
    gamePanelsArray.push(arrayRow);
}

while (objectiveCount > 0) {
    let posX = Math.floor(Math.random() * cols);
    let posY = Math.floor(Math.random() * rows);

    console.log(posX, posY);

    if ((posX != 0 || posY != 0) && gamePanelsArray[posY][posX].isObjective == false) {
        gamePanelsArray[posY][posX].isObjective = true;
        gamePanelsArray[posY][posX].panelId.style.backgroundColor = 'red';
        objectiveCount--;
    }
}

console.log(gamePanelsArray);


// GAME ENGINE

gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'yellow';


let pressedKey = 0

document.addEventListener('keydown', (e) => {
    let pressedKey = e.code;

    switch (pressedKey) {
        case 'ArrowLeft':
            if (playerPos[1] != 0) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                if (gamePanelsArray[playerPos[0]][playerPos[1]].isObjective == true) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].isObjective = false;
                    victoryCount--;
                }

                playerPos[1]--;
                break;
            } else {
                break;
            }

        case 'ArrowUp':
            if (playerPos[0] != 0) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                if (gamePanelsArray[playerPos[0]][playerPos[1]].isObjective == true) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].isObjective = false;
                    victoryCount--;
                }

                playerPos[0]--;
                break;
            } else {
                break;
            }

        case 'ArrowRight':
            if (playerPos[1] != cols - 1) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                if (gamePanelsArray[playerPos[0]][playerPos[1]].isObjective == true) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].isObjective = false;
                    victoryCount--;
                }

                playerPos[1]++;
                break;
            } else {
                break;
            }

        case 'ArrowDown':
            if (playerPos[0] != rows - 1) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                if (gamePanelsArray[playerPos[0]][playerPos[1]].isObjective == true) {
                    gamePanelsArray[playerPos[0]][playerPos[1]].isObjective = false;
                    victoryCount--;
                }

                playerPos[0]++;
                break;
            } else {
                break;
            }

        default:
            break;
    }
    gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'yellow';

    console.log(victoryCount);
    if (victoryCount == 0) {
        alert('Wygrałeś!!!');
    }
});

// JEST JAKIŚ PROBLEM Z CYKLEM ŻYCIA EVENTU (LINIA 80):
// - odpala się event 'keydown', czyli update planszy/gry;
// - victoryCount obniżany jest o 1, ale ta zmiana jest rejestrowana dopiero po zakończeniu wykonywania eventu;
// - naciska się klawisz i dopiero wtedy pojawia się alert
// Będę starał się to jakoś obejść, to jest tylko informacja dla potencjalnych oglądających