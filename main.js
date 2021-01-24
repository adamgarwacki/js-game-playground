'use strict';

// TODO:
// - lepsza funkcja-bezpiecznik (line 66)
// - zmienić playerMovement (line 36, 244): problem z event listenerem


// "INIT":
let gameContainer = document.getElementById('game-container');

// PRESETY MAP:
let map1 = {
    'size': 6,
    'objectiveCount': 5,
    'obstacleMap': [[0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1],
                    [0, 1, 0, 0, 0, 0],
                    [0, 1, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 1, 0]],
    'playerPosition': [0, 0]
}


// PARAMETRY GRY:
// NIE USUWAĆ!!!! MOŻE BYĆ POTRZEBNE DO ODKRĘCENIA JAKIEGOŚ BŁĘDU!
// let mapObject.objectiveCount = 3;
// let mapObject.obstacleMap = [[0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 0]];
// let mapObject.playerPosition = [0, 0];
// let mapObject.size = 5;
// let mapObject.size = 5;


// START GRY, GENEROWANIE MAPY, PORUSZANIE SIĘ ETC:

let playerMovement = undefined;

let startMenu = () => {
    gameContainer.innerHTML = '';

    let menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    let startButton = document.createElement('button');
    startButton.classList.add('game-menu-button');
    startButton.textContent = 'START';
    startButton.addEventListener('click', () => {
        console.log('dzyń');
        startGame(map1);
    })

    menuContainer.appendChild(startButton);
    gameContainer.appendChild(menuContainer);
}


let startGame = (mapObject) => {
    gameContainer.innerHTML = '';

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

    // ALERT NA WYPADEK NIEWŁAŚCIWEJ ILOŚCI KOLUMN: ---- DO POPRAWY - WZIĄĆ POD UWAGĘ ILOŚĆ PRZESZKÓD NA PLANSZY!!!!
    if (((mapObject.size * mapObject.size) - 1) < mapObject.objectiveCount) {
        alert('UWAGA! ZA MAŁO PÓL - WEJDZIE NIESKOŃCZONA PĘTLA!!!!!!!');
        mapObject.objectiveCount = 0
    }
    
    let indexIterator = 0;
    let gamePanelsArray = [];
    
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
    });

    
    // USTAWIANIE OBJECTIVE
    let objectiveCount = mapObject.objectiveCount;
    let victoryCount = mapObject.objectiveCount;

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

    let changeObjective = (maxScore, victoryCount) => {
        document.getElementById('score').innerText = `${maxScore - victoryCount} / ${maxScore}`;
    }
    
    changeObjective(objectiveCount, victoryCount);
    

    // GAME ENGINE
    gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'gold';

    playerMovement = (direction) => {
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

            case 'Escape':
                gameContainer.removeEventListener('keydown', playerMovement);
                console.log(gamePanelsArray, map1);
                startMenu();
                break;
    
            default:
                break;
        }
        gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].panelId.style.backgroundColor = 'gold';
    
        if (gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].isObjective == true) {
            gamePanelsArray[mapObject.playerPosition[0]][mapObject.playerPosition[1]].isObjective = false;
            victoryCount--;
            changeObjective(objectiveCount, victoryCount);

            if (victoryCount == 0) {
                let gameContainerWin = document.createElement('div');
                gameContainerWin.classList.add('game-container-win');
                gameContainerWin.id = 'game-container-win';
    
                let winMessage = document.createElement('p');
                winMessage.classList.add('win-message');
                winMessage.textContent = 'You win!';
    
                gameContainerWin.appendChild(winMessage);
                gameContainer.appendChild(gameContainerWin);
    
                // timeout powoduje że widoczna jest animacja - chodzi o coś z renderowaniem elementów html...?
                setTimeout(() => {
                    gameContainerWin.style.opacity = 1;
                }, 10);
            }
        }
    }
    
    
    // EVENTS HANDLING
}

document.addEventListener('keydown', (e) => {
    playerMovement(e.code);
});

// "INIT2:"
startMenu();









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
