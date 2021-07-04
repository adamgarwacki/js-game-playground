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