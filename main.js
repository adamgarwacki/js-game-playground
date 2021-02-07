'use strict';

// TODO:
// - lepsza funkcja-bezpiecznik (line 66)
// - dodać licznik ruchów 


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

// START GRY, GENEROWANIE MAPY, PORUSZANIE SIĘ ETC:

// playerMovement definiowane jest tutaj, żeby móc z niego korzystać w startMenu oraz w event listenerze w linii 248;
let playerMovement = undefined;

let startMenu = () => {
    gameContainer.innerHTML = '';

    let menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    let startButton = document.createElement('button');
    startButton.classList.add('game-menu-button');
    startButton.textContent = 'START';
    startButton.addEventListener('click', () => {
        // deep clone obiektu, żeby nie pisać po oryginale
        let mapObject = JSON.parse(JSON.stringify(map1));
        startGame(mapObject);
    })

    menuContainer.appendChild(startButton);
    gameContainer.appendChild(menuContainer);
}


let startGame = (mapObject) => {

    gameContainer.innerHTML = '';

    // zmienne dla wygody
    let mapSize = mapObject.size;
    let mapObjectiveCount = mapObject.objectiveCount;
    let mapObstacleMap = mapObject.obstacleMap;
    let mapPlayerPosition = mapObject.playerPosition;

    let panelSizePreset = '';
    switch (mapSize) {
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

    let obstacleCount = 0;
    mapObstacleMap.forEach((arr) => {
        arr.forEach((el) => {
            if (el == 1) {
                obstacleCount += 1;
            }
        });
    });

    if (((mapSize * mapSize) - 1 - obstacleCount) < mapObjectiveCount) {
        alert('Plansza ma za mało pól by wygenerować na niej podaną liczbę punktów do zebrania.');
        mapObjectiveCount = 0;
    }
    
    let indexIterator = 0;
    let gamePanelsArray = [];
    for (let i = 0; i < mapSize; i++) {
        let arrayRow = [];
        for (let j = 0; j < mapSize; j++) {
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
            indexIterator += 1;
        }
        gamePanelsArray.push(arrayRow);
    }
    console.log(gamePanelsArray);

    // USTAWIANIE MAPY
    mapObstacleMap.forEach(row => {
        for (let i = 0; i < row.length; i++) {
            if (row[i] == 1) {
                gamePanelsArray[mapObstacleMap.indexOf(row)][i].isObstacle = true;
                gamePanelsArray[mapObstacleMap.indexOf(row)][i].panelId.style.backgroundColor = 'gray';
            }
        }
    });

    
    // USTAWIANIE OBJECTIVE
    // let objectiveCount = mapObjectiveCount;
    let victoryCount = mapObjectiveCount;

    let ob = mapObjectiveCount;
    while (ob > 0) {
        let posX = Math.floor(Math.random() * mapSize);
        let posY = Math.floor(Math.random() * mapSize);
    
        if ((posX != 0 || posY != 0) && !gamePanelsArray[posY][posX].isObjective && !gamePanelsArray[posY][posX].isObstacle) {
            gamePanelsArray[posY][posX].isObjective = true;
            gamePanelsArray[posY][posX].panelId.style.backgroundColor = 'red';
            ob--;
        }
    }

    let changeObjective = (maxScore, victoryCount) => {
        document.getElementById('score').innerText = `${maxScore - victoryCount} / ${maxScore}`;
    }
    
    changeObjective(mapObjectiveCount, victoryCount);
    

    // GAME ENGINE
    gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].panelId.style.backgroundColor = 'gold';

    playerMovement = (direction) => {
        switch (direction) {
            case 'ArrowLeft':
                if (mapPlayerPosition[1] != 0 && !gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1] - 1].isObstacle) {
                    gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].panelId.style.backgroundColor = 'green';
    
                    mapPlayerPosition[1]--;
                    break;
                } else {
                    break;
                }
    
            case 'ArrowUp':
                if (mapPlayerPosition[0] != 0 && !gamePanelsArray[mapPlayerPosition[0] - 1][mapPlayerPosition[1]].isObstacle) {
                    gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].panelId.style.backgroundColor = 'green';
    
                    mapPlayerPosition[0]--;
                    break;
                } else {
                    break;
                }
    
            case 'ArrowRight':
                if (mapPlayerPosition[1] != mapSize - 1 && !gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1] + 1].isObstacle) {
                    gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].panelId.style.backgroundColor = 'green';
    
                    mapPlayerPosition[1]++;
                    break;
                } else {
                    break;
                }
    
            case 'ArrowDown':
                if (mapPlayerPosition[0] != mapSize - 1 && !gamePanelsArray[mapPlayerPosition[0] + 1][mapPlayerPosition[1]].isObstacle) {
                    gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].panelId.style.backgroundColor = 'green';
    
                    mapPlayerPosition[0]++;
                    break;
                } else {
                    break;
                }

            case 'Escape':
                gameContainer.removeEventListener('keydown', playerMovement);
                startMenu();
                break;
    
            default:
                break;
        }
        gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].panelId.style.backgroundColor = 'gold';
    
        if (gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].isObjective == true) {
            gamePanelsArray[mapPlayerPosition[0]][mapPlayerPosition[1]].isObjective = false;
            victoryCount--;
            changeObjective(mapObjectiveCount, victoryCount);

            if (victoryCount == 0) {
                let gameContainerWin = document.createElement('div');
                gameContainerWin.classList.add('game-container-win');
                gameContainerWin.id = 'game-container-win';
    
                let winMessage = document.createElement('p');
                winMessage.classList.add('win-message');
                winMessage.textContent = 'You win!';

                let subWinMessage = document.createElement('p');
                subWinMessage.classList.add('win-message', 'sub-win-message');
                subWinMessage.textContent = 'press Esc';
    
                gameContainerWin.appendChild(winMessage);
                gameContainerWin.appendChild(subWinMessage);
                gameContainer.appendChild(gameContainerWin);
    
                // timeout powoduje że widoczna jest animacja - chodzi o coś z renderowaniem elementów html...?
                setTimeout(() => {
                    gameContainerWin.style.opacity = 1;
                }, 10);
            }
        }
    }
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
