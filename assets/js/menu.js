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
};


startMenu();