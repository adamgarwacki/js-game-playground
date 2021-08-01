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

//MUZYKA

let on_off = document.querySelector('.container .musicButton');


let audio = document.getElementById('audio');
on_off.onclick = () => {
  if (audio.paused) { audio.play(); }
  else { audio.pause(); }
}
on_off.addEventListener('click', () => {
    console.log('dzyń');
    }
  );
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




// "INIT2:"






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

