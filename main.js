'use strict';

// PARAMETRY GRY:

let cols = 5;
let rows = 5;

let objectiveCount = 3;
let victoryCount = objectiveCount;
let obstacleMap5x5 = [[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0]];

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

        // Nadawanie id poszczególnym polom - może się przydać kiedyś!!!
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
console.log(gamePanelsArray);

// USTAWIANIE MAPY
obstacleMap5x5.forEach(row => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] == 1) {
            gamePanelsArray[obstacleMap5x5.indexOf(row)][i].isObstacle = true;
            gamePanelsArray[obstacleMap5x5.indexOf(row)][i].panelId.style.backgroundColor = 'gray';
        }
    }
})


// GENEROWANIE LABIRYNTU: (NIE DZIAŁA - ZOSTAWIAM JAKO "PAMIĄTKA")

/* gamePanelsArray.forEach((row) => {
    row.forEach((panel) => {
        let xPos = row.indexOf(panel);
        let yPos = gamePanelsArray.indexOf(row);
        
        let walkWayCount = 0;
        let nearbyObstacles = [];

        if (yPos > 0) {
            if (gamePanelsArray[yPos-1][xPos].isObstacle) {
                nearbyObstacles.push(gamePanelsArray[yPos-1][xPos]);
            } else {
                walkWayCount++;
            }
        }

        if (xPos > 0) {
            if (gamePanelsArray[yPos][xPos-1].isObstacle) {
                nearbyObstacles.push(gamePanelsArray[yPos][xPos-1]);
            } else {
                walkWayCount++;
            }
        }

        if (xPos < cols-1) {
            if (gamePanelsArray[yPos][xPos+1].isObstacle) {
                nearbyObstacles.push(gamePanelsArray[yPos][xPos+1]);
            } else {
                walkWayCount++;
            }
        }

        if (yPos < rows-1) {
            if (gamePanelsArray[yPos+1][xPos].isObstacle) {
                nearbyObstacles.push(gamePanelsArray[yPos+1][xPos]);
            } else {
                walkWayCount++;
            }
        }

        // let nearbyObstaclesCount = nearbyObstacles.length;


        // TUTAJ NIE DZIAŁA!!!!!!!!!!!
        console.log(walkWayCount);
        while (walkWayCount < 2) {
            let randNum = Math.floor(Math.random()*nearbyObstacles.length)
            nearbyObstacles[randNum].isObstacle = false;
            nearbyObstacles[randNum].panelId.style.backgroundColor = 'green';
            let tempArr = nearbyObstacles.splice(randNum, 1);
            nearbyObstacles = [];
            nearbyObstacles = tempArr;
            // console.log(nearbyObstacles);
            walkWayCount++;
        }
    })
}) */


// USTAWIANIE OBJECTIVE

while (objectiveCount > 0) {
    let posX = Math.floor(Math.random() * cols);
    let posY = Math.floor(Math.random() * rows);

    if ((posX != 0 || posY != 0) && !gamePanelsArray[posY][posX].isObjective && !gamePanelsArray[posY][posX].isObstacle) {
        gamePanelsArray[posY][posX].isObjective = true;
        gamePanelsArray[posY][posX].panelId.style.backgroundColor = 'red';
        objectiveCount--;
    }
}


// GAME ENGINE

gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'yellow';


document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            if (playerPos[1] != 0 && !gamePanelsArray[playerPos[0]][playerPos[1] - 1].isObstacle) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                playerPos[1]--;
                break;
            } else {
                break;
            }

        case 'ArrowUp':
            if (playerPos[0] != 0 && !gamePanelsArray[playerPos[0] - 1][playerPos[1]].isObstacle) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                playerPos[0]--;
                break;
            } else {
                break;
            }

        case 'ArrowRight':
            if (playerPos[1] != cols - 1 && !gamePanelsArray[playerPos[0]][playerPos[1] + 1].isObstacle) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                playerPos[1]++;
                break;
            } else {
                break;
            }

        case 'ArrowDown':
            if (playerPos[0] != rows - 1 && !gamePanelsArray[playerPos[0] + 1][playerPos[1]].isObstacle) {
                gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'green';

                playerPos[0]++;
                break;
            } else {
                break;
            }

        default:
            break;
    }
    gamePanelsArray[playerPos[0]][playerPos[1]].panelId.style.backgroundColor = 'yellow';

    if (gamePanelsArray[playerPos[0]][playerPos[1]].isObjective == true) {
        gamePanelsArray[playerPos[0]][playerPos[1]].isObjective = false;
        victoryCount--;
    }

    // Poniższy setTimeout() "opóźnia" (chyba...?) w jakiś sposób wykonanie tego alertu, tak żeby najpierw poszedł DOM
    // zmieniający kolor kafelka na żółty.
    // Wiem że działa, ale nie wiem dlaczego.

    setTimeout(() => {
        if (victoryCount == 0) {
            alert('Wygrałeś!!!');
        }
    }, 0);
});