'use strict';

// PARAMETRY GRY:

// NIE USUWAĆ!!!! MOŻE BYĆ POTRZEBNE DO ODKRĘCENIA JAKIEGOŚ BŁĘDU!
// let mapObject.objectiveCount = 3;
// let mapObject.obstacleMap = [[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0]];
// let mapObject.playerPosition = [0, 0];
// let mapObject.size = 5;
// let mapObject.size = 5;


let mapObject = {
    'size': 6,
    'objectiveCount': 5,
    'obstacleMap': [[0, 0, 0, 0, 0, 0], 
                    [0, 1, 0, 1, 0, 1], 
                    [0, 1, 0, 0, 0, 0], 
                    [0, 1, 1, 0, 1, 0], 
                    [0, 0, 0, 0, 0, 0]],
    'playerPosition': [0, 0]
}

let panelSizePreset = '';

switch (mapObject.size) {
    case 2:
        panelSizePreset = 'single-panel-2';
        break;

    case 3:
        panelSizePreset = 'single-panel-3';
        break;

    case 4:
        panelSizePreset = 'single-panel-4';
        break;

    case 5:
        panelSizePreset = 'single-panel-5';
        break;
    
    case 6:
        panelSizePreset = 'single-panel-6';
        break;

    case 8:
        panelSizePreset = 'single-panel-8';
        break;

    default:
        console.log('Nie istnieje preset kafelka dla podanego rozmiaru planszy!');
        break;
}


// ALERT NA WYPADEK NIEWŁAŚCIWEJ ILOŚCI KOLUMN:

if (((mapObject.size * mapObject.size) - 1) < mapObject.objectiveCount) {
    alert('UWAGA! ZA MAŁO PÓL - WEJDZIE NIESKOŃCZONA PĘTLA!!!!!!!');
    mapObject.objectiveCount = 0
}


// ------------------------------------

let gameContainer = document.getElementById('game-container');

// let containerWidth = mapObject.size * 100;
// gameContainer.style.width = `${containerWidth}px`;
// let containerHeight = mapObject.size * 100;
// gameContainer.style.height = `${containerHeight}px`;

let gamePanelsArray = [];
let indexIterator = 0;

for (let i = 0; i < mapObject.size; i++) {
    let arrayRow = [];
    for (let j = 0; j < mapObject.size; j++) {
        let singlePanelObject = {}
        let singleGamePanel = document.createElement('div');
        singleGamePanel.classList.add('single-panel', panelSizePreset);

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
mapObject.obstacleMap.forEach(row => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] == 1) {
            gamePanelsArray[mapObject.obstacleMap.indexOf(row)][i].isObstacle = true;
            gamePanelsArray[mapObject.obstacleMap.indexOf(row)][i].panelId.style.backgroundColor = 'gray';
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
let victoryCount = mapObject.objectiveCount;

let changeObjective = () => {
    document.getElementById('score').innerText = `${mapObject.objectiveCount - victoryCount} / ${mapObject.objectiveCount}`;
}

let ob = mapObject.objectiveCount;
while (ob > 0) {
    let posX = Math.floor(Math.random() * mapObject.size);
    let posY = Math.floor(Math.random() * mapObject.size);

    if ((posX != 0 || posY != 0) && !gamePanelsArray[posY][posX].isObjective && !gamePanelsArray[posY][posX].isObstacle) {
        gamePanelsArray[posY][posX].isObjective = true;
        gamePanelsArray[posY][posX].panelId.style.backgroundColor = 'red';
        ob--;
    }
}

changeObjective();



// GAME ENGINE

gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'gold';

let playerMovement = (direction) => {
    switch (direction) {
        case 'ArrowLeft':
            if (mapObject.playerPosition[1] != 0 && !gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1] - 1].isObstacle) {
                gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'green';

                mapObject.playerPosition[1]--;
                break;
            } else {
                break;
            }

        case 'ArrowUp':
            if (mapObject.playerPosition[0] != 0 && !gamePanelsArray[mapObject.playerPosition[0] - 1][mapObject.playerPosition[1]].isObstacle) {
                gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'green';

                mapObject.playerPosition[0]--;
                break;
            } else {
                break;
            }

        case 'ArrowRight':
            if (mapObject.playerPosition[1] != mapObject.size - 1 && !gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1] + 1].isObstacle) {
                gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'green';

                mapObject.playerPosition[1]++;
                break;
            } else {
                break;
            }

        case 'ArrowDown':
            if (mapObject.playerPosition[0] != mapObject.size - 1 && !gamePanelsArray[mapObject.playerPosition[0] + 1][mapObject.playerPosition[1]].isObstacle) {
                gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'green';

                mapObject.playerPosition[0]++;
                break;
            } else {
                break;
            }

        default:
            break;
    }
    gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'gold';

    if (gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].isObjective == true) {
        gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].isObjective = false;
        victoryCount--;
        changeObjective();
    }

    // Poniższy setTimeout() "opóźnia" (chyba...?) w jakiś sposób wykonanie tego alertu, tak żeby najpierw poszedł DOM
    // zmieniający kolor kafelka na żółty.
    // Wiem że działa, ale nie wiem dlaczego.

    setTimeout(() => {
        if (victoryCount == 0) {
            document.getElementById('game-container-win').style.opacity = 1;
        }
    }, 0);
}


// EVENTS HANDLING

document.addEventListener('keydown', (e) => {
    playerMovement(e.code);
});