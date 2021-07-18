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
        targetPanel.classList.remove('obstacle-panel');
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

    // todo: nie zapisujemy planszy w postaci 0/1, to powoduje problemy z liczeniem obstacles i tak dalej
    // coś jest nie tak ze spójnością: dwa różne rodzaje zapisu???

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

