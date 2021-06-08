'use strict';


// TODO:
// - lepsza funkcja-bezpiecznik (line 66)
// - dodać licznik ruchów 


// "INIT":

// sprawdzanie czy urządzenie ma ekran dotykowy:
if (!('ontouchstart' in window)) {
    document.getElementById('button-space').style.display = 'none';
}

// gameContainer jest divem, w którym będą pojawiały się mapy, ekrany opcji i inne takie
// to jest coś w stylu "ekranu gry"
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

// ODŚWIEŻANIE MAPY:

let setMapObject = (size) => {
    let pArr = [];
    for (let i = 0; i < size; i++) {
        let arrayRow = [];
        for (let j = 0; j < size; j++) {
            let singlePanelObject = {};
            singlePanelObject.panelId = undefined;
            singlePanelObject.isObstacle = false;
            singlePanelObject.isObjective = false;
            arrayRow.push(singlePanelObject);
        }
        pArr.push(arrayRow);
    }
    return pArr;
}

let refreshGameDOM = (dObj, target, preset) => {
    target.innerHTML = '';
    dObj.forEach(row => {
        row.forEach(el => {
            let singleGamePanel = document.createElement('div');
            singleGamePanel.classList.add('single-panel', preset);

            el.panelId = singleGamePanel;

            target.appendChild(singleGamePanel);
        });
    });
}

// changeState toggluje między przeszkodą a polem do chodzenia po naciśnięciu na element
let changeState = (y, x, gpa) => {
    let isObstacle = gpa[y][x].isObstacle;
    let targetPanel = gpa[y][x].panelId;

    if (isObstacle) {
        gpa[y][x].isObstacle = false;
    } else {
        gpa[y][x].isObstacle = true;
        targetPanel.classList.add('obstacle-panel');
    }
}

// setChangeState jedynie dodaje funkcję do elementów
let setChangeState = (gpa) => {
    for (let i = 0; i < gpa.length; i++) {
        for (let j = 0; j < gpa[i].length; j++) {
            gpa[i][j].panelId.addEventListener('click', () => changeState(i, j, gpa));
        } 
    }
}

let changePanelPreset = (s) => {
    let p = '';
    switch (s) {
        case 2:
            p = 'single-panel-2';
            break;

        case 3:
            p = 'single-panel-3';
            break;

        case 4:
            p = 'single-panel-4';
            break;

        case 5:
            p = 'single-panel-5';
            break;

        case 6:
            p = 'single-panel-6';
            break;

        case 8:
            p = 'single-panel-8';
            break;

        default:
            console.log('Nie istnieje preset kafelka dla podanego rozmiaru planszy!');
            break;
    }
    return p;
}

// START GRY, GENEROWANIE MAPY, PORUSZANIE SIĘ ETC:

let startMenu = () => {
    gameContainer.innerHTML = '';

    let menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-container');

    // przycisk start:
    let startButton = document.createElement('button');
    startButton.classList.add('game-menu-button');
    startButton.textContent = 'START';
    startButton.addEventListener('click', () => {
        // deep clone obiektu, żeby nie pisać po oryginale
        let mapObject = JSON.parse(JSON.stringify(map1));
        startGame(mapObject);
    });
    menuContainer.appendChild(startButton);

    // przycisk wybory poziomu:
    let chooseLevelButton = document.createElement('button');
    chooseLevelButton.classList.add('game-menu-button');
    chooseLevelButton.textContent = 'CHOOSE LEVEL';
    chooseLevelButton.addEventListener('click', () => {
        startChooseLevel();
    });
    menuContainer.appendChild(chooseLevelButton);


    // przycisk custom:
    let customButton = document.createElement('custom');
    customButton.classList.add('game-menu-button');
    customButton.textContent = 'CUSTOM';
    customButton.addEventListener('click', () => {
        startCustom();
    });
    menuContainer.appendChild(customButton);


    // przycisk opcje:
    let optionButton = document.createElement('button');
    optionButton.classList.add('game-menu-button');
    optionButton.textContent = 'OPTIONS';
    optionButton.addEventListener('click', () => {
        startOptions();
    });
    menuContainer.appendChild(optionButton);


    gameContainer.appendChild(menuContainer);
}


let startChooseLevel = () => {
    console.log('choose level!');
}


let startOptions = () => {
    console.log('options!');
}


let startCustom = () => {
    console.log('custom!');

    let customMapObject = {
        'size': 0, // input type number - suwak ???
        'objectiveCount': 0, // input type number - suwaki???
        'obstacleMap': [], // na podstawie size, wyświetlić pustą mapę, po kliknięciu togglować odpowiednie kafelki???
        'playerPosition': [0, 0] // wpisać dwa parametry - współrzędne
    };

    let mapSize = 0;

    // tworzenie elementów układających się w menu customowej gry:
    gameContainer.innerHTML = '';

    let customMenuContainer = document.createElement('div');
    customMenuContainer.classList.add('menu-container');

    let customOptionsContainer = document.createElement('div');
    customOptionsContainer.classList.add('custom-options-container');

    // custom game to taki level creator, ozancza pola jako gracz/przeszkoda, po czym zapisuje

    // mapPreview pokazuje jak będzie wyglądała mapa, plus pozwala na zaznaczanie który kafelek będzie przeszkodą;
    let mapPreview = document.createElement('div');
    mapPreview.classList.add('map-preview');
    mapPreview.id = 'map-preview';
    customMenuContainer.appendChild(mapPreview);




    let sizeInput = document.createElement('select');
    sizeInput.setAttribute('name', 'map-size-input');
    sizeInput.id = 'map-size-input';
    
    let sizesTable = [2, 3, 4, 5, 6, 8];
    sizesTable.forEach(e => {
        let opt = document.createElement('option');
        opt.value = `${e}`;
        opt.innerText = e;
        sizeInput.appendChild(opt);
    });

    // to zmienia preset kafelków, odświeża mapę i dodaje każdemu elementowi changeState
    sizeInput.addEventListener('change', () => {
        mapSize = parseInt(sizeInput.value);
        let s = changePanelPreset(mapSize);

        customMapObject.obstacleMap = setMapObject(mapSize);
        refreshGameDOM(customMapObject.obstacleMap, mapPreview, s);

        setChangeState(customMapObject.obstacleMap);
    });
    customOptionsContainer.appendChild(sizeInput);




    // OBJECTIVE COUNT
    
    // let objectiveCountInput = document.createElement('input');
    // objectiveCountInput.setAttribute('type', 'number');
    // objectiveCountInput.addEventListener('change', () => {
    //     console.log('dzyń');
    // });
    // customMenuContainer.appendChild(objectiveCountInput);

    let uploadFileInput = document.createElement('input');
    uploadFileInput.setAttribute('type', 'file');
    uploadFileInput.setAttribute('accept', '.json');

    uploadFileInput.addEventListener('change', (e) => {
        const reader = new FileReader();
        // najpierw odczytuje, potem dopiero może coś z tym zrobić
        reader.addEventListener('load', () => {
            let data = reader.result;
            customMapObject = JSON.parse(data);
            console.log(customMapObject);
        });
        reader.readAsText(e.target.files[0]);
    });
    customOptionsContainer.appendChild(uploadFileInput);

    let startGameButton = document.createElement('button');
    startGameButton.textContent = 'start';
    startGameButton.classList.add('start-custom-game', 'inactive');
    customOptionsContainer.appendChild(startGameButton);
    startGameButton.onclick = () => {
        startGame(customMapObject);
    };


    let saveButton = document.createElement('button');
    saveButton.classList.add('save-map');
    saveButton.id = 'save-map';
    saveButton.innerText = 'Zapisz mapę';
    customOptionsContainer.appendChild(saveButton);

    let saveMap = () => {
        let mapName = window.prompt('Nazwa mapy:');
        if (mapName != undefined) {
            localStorage.setItem(mapName, JSON.stringify(customMapObject));
        }
    }

    saveButton.addEventListener('click', () => {
        saveMap();
    });


    customMenuContainer.appendChild(customOptionsContainer);
    gameContainer.appendChild(customMenuContainer);
}


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

