'use strict';
// PODAJ LICZBĘ RZĘDÓW I KOLUMN:
let cols = 8;
let rows = 7;

// ------------------------------------

let gameContainer = document.getElementById('game-container');

let containerWidth = cols*100;
gameContainer.style.width = `${containerWidth}px`;

let containerHeight = rows*100;
gameContainer.style.height = `${containerHeight}px`;

for (let i = 0; i < cols*rows; i++) {
    let singleGamePanel = document.createElement('div');
    singleGamePanel.classList.add('single-panel');
    gameContainer.appendChild(singleGamePanel);
    console.log(i);
}