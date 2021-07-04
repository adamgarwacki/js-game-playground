let startGame = (mapObject) => {

    // INIT


    // czyszczenie ekranu gry:
    gameContainer.innerHTML = '';

    // mapSize jest potrzebny do określania rozmiarów kafelków:
    let mapSize = mapObject.size;

    // obstacleMap ustala dokładnie które kafelki są przeszkodami:
    let mapObstacleMap = mapObject.obstacleMap;
    
    // objectiveCount określa ilość celów do zebrania; na jego podstawie jest zrobiony licznik punktow:
    let mapObjectiveCount = mapObject.objectiveCount;

    // playerY/X służą do poruszania się oraz sprawdzania pozycji gracza zdefiniowanej w obiekcie mapy:
    let playerY = mapObject.playerPosition[0];
    let playerX = mapObject.playerPosition[1];


    // ustawianie rozmiarów kafelka w zależności od rozmiaru planszy:
    let panelSizePreset = changePanelPreset(mapSize);


    // układanie przeszkód na mapie:
    let obstacleCount = 0;
    mapObstacleMap.forEach((arr) => {
        arr.forEach((el) => {
            if (el == 1) {
                obstacleCount += 1;
            }
        });
    });

    // tworzenie obiektu plansz:
    let gamePanelsArray = setMapObject(mapSize);

    // dodawanie mapy do DOMu:
    refreshGameDOM(gamePanelsArray, gameContainer, panelSizePreset);

    // USTAWIANIE MAPY - układanie przeszkód oraz celów na wcześniej stworzonej mapie:

    // poniższy if ma zapobiegać wchodzeniu w nieskończoną pętlę, kiedy nie da rady wygenerować wskazanej w obiekcie mapy liczby celów do zebrania:
    if (((mapSize * mapSize) - 1 - obstacleCount) < mapObjectiveCount) {
        alert('Plansza ma za mało pól by wygenerować na niej podaną liczbę punktów do zebrania.');
        mapObjectiveCount = 0;
    }

    // układanie przeszkód na planszy:
    mapObstacleMap.forEach(row => {
        for (let i = 0; i < row.length; i++) {
            if (row[i] == 1) {
                gamePanelsArray[mapObstacleMap.indexOf(row)][i].isObstacle = true;
                gamePanelsArray[mapObstacleMap.indexOf(row)][i].panelId.classList.add ('obstacle-panel');
            }
        }
    });

    // pętla while losująca miejsca na planszy na których ma być umieszczony cel do zebrania:
    let victoryCount = mapObjectiveCount;
    let ob = mapObjectiveCount;

    while (ob > 0) {
        let posX = Math.floor(Math.random() * mapSize);
        let posY = Math.floor(Math.random() * mapSize);

        let randomPos = gamePanelsArray[posY][posX];
    
        if ((posX != playerX || posY != playerY) && !randomPos.isObjective && !randomPos.isObstacle) {
            randomPos.isObjective = true;
            randomPos.panelId.classList.add('mark-panel');
            ob--;
        }
    }

    // changeObjective zmienia wartość wpisaną w wyświetlany obok planszy licznik:
    let changeObjective = (maxScore, victoryCount) => {
        document.getElementById('score').innerText = `${maxScore - victoryCount} / ${maxScore}`;
    }
    
    // pierwszy changeObjective aby zainicjować licznik:
    changeObjective(mapObjectiveCount, victoryCount);
    


    // -----------------------------------------------------------------------

    // GAME ENGINE


    // poniżej inicjowana jest pozycja gracza:
    gamePanelsArray[playerY][playerX].panelId.classList.add('player-panel');

    let playerMovement = (direction) => {
        playerY = mapObject.playerPosition[0];
        playerX = mapObject.playerPosition[1];

        switch (direction) {
            case 'ArrowLeft':
                if (playerX != 0 && !gamePanelsArray[playerY][playerX - 1].isObstacle) {
                    gamePanelsArray[playerY][playerX].panelId.classList.remove('player-panel');
                    
                    playerX--;
                    break;
                } else {
                    break;
                }
    
            case 'ArrowUp':
                if (playerY != 0 && !gamePanelsArray[playerY - 1][playerX].isObstacle) {
                    gamePanelsArray[playerY][playerX].panelId.classList.remove('player-panel');

                    playerY--;
                    break;
                } else {
                    break;
                }
    
            case 'ArrowRight':
                if (playerX != mapSize - 1 && !gamePanelsArray[playerY][playerX + 1].isObstacle) {
                    gamePanelsArray[playerY][playerX].panelId.classList.remove('player-panel');

                    playerX++;
                    break;
                } else {
                    break;
                }
    
            case 'ArrowDown':
                if (playerY != mapSize - 1 && !gamePanelsArray[playerY + 1][playerX].isObstacle) {
                    gamePanelsArray[playerY][playerX].panelId.classList.remove('player-panel');

                    playerY++;
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

        // "pomalowanie" nowego kafelka i zapisanie nowej pozycji gracza:
        gamePanelsArray[playerY][playerX].panelId.classList.add('player-panel');
        mapObject.playerPosition[0] = playerY;
        mapObject.playerPosition[1] = playerX;
    
        if (gamePanelsArray[playerY][playerX].isObjective == true) {
            gamePanelsArray[playerY][playerX].isObjective = false;
            gamePanelsArray[playerY][playerX].panelId.classList.remove('mark-panel');
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

    document.addEventListener('keydown', (e) => {
        playerMovement(e.code);
    });
}