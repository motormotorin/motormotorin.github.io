
const path = './media/plans/buildingA/';


// Building object example
// TODO: for every levels add his owns organisations
const BuildingA = {
    defaultLevel: 6,
    coords: {
        topLeft:    { lat: 43.02507858514359, lng: 131.8935137987137  },
        topRight:   { lat: 43.02479622315571, lng: 131.89463496208194 },
        bottomLeft: { lat: 43.02421869798665, lng: 131.8931120321577  }
    },
    levels: [
        { level: '5',  img: `${path}Level-5.svg`,  opacity: 0 },
        { level: '6',  img: `${path}Level-6.svg`,  opacity: 0.6 },
        // TODO: add others levels
    ],
};

const createLevels = (building) => {
    var imageOverlays = {
        defaultLevel: building.defaultLevel,
        levels: []
    };
    building.levels.forEach(el => {
        imageOverlays.levels.push({
            level: el.level,
            layer: new L.imageOverlay.rotated(
                el.img, 
                building.coords.topLeft,
                building.coords.topRight,
                building.coords.bottomLeft, {
                    opacity: el.opacity,
                    interactive: true
                }),
            
        });
    });

    return imageOverlays;
}

const levelsArray = createLevels(BuildingA);
var levelContainer = null;
const buildLevelSwitcher = () => {
    
    levelsArray.levels.forEach(level => {
        map.addLayer(level.layer);
    });

    var spanArray = [];
    var defaultLevelIndex = levelsArray.levels.findIndex(el => el.level == levelsArray.defaultLevel);
    var translateSum = 36 * defaultLevelIndex;

    levelsArray.levels.forEach(level => {
        var span = document.createElement('span');
        span.innerText = level.level;
        span.style.transform = `translateY(-${translateSum}px)`;
        spanArray.push(span);
    });

    map.fitBounds(new L.LatLngBounds(BuildingA.coords.topLeft, 
                                     BuildingA.coords.topRight)
        .extend(BuildingA.coords.bottomLeft));

    const levelSwitcherHTML = `
        <div class="level-switcher right-middle shadow">
            <button class="switch-top"><img src="./media/icons/next.svg" alt=""></button>
            <div class="level-container">
            </div>
            <button class="switch-bottom"><img src="./media/icons/next.svg" alt=""></button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', levelSwitcherHTML);


    var levelSwitcher = document.querySelector('.level-switcher');
    var currentLevelIndex = defaultLevelIndex;

    levelContainer = document.querySelector('.level-container');
    spanArray.forEach(el => levelContainer.appendChild(el));  

    levelSwitcher.querySelector('.switch-top').addEventListener('click', () => {
        if (currentLevelIndex + 1 >= spanArray.length) {
            return;
        } else {
            levelsArray.levels[currentLevelIndex].layer.setOpacity(0);
            levelsArray.levels[++currentLevelIndex].layer.setOpacity(0.6);

            translateSum += 36;

            levelSwitcher.querySelectorAll('span').forEach(el => {
                el.style.transform = `translateY(${(-1) * translateSum}px)`;
        });
        }
    });
    
    levelSwitcher.querySelector('.switch-bottom').addEventListener('click', () => {
        if (currentLevelIndex - 1 < 0) {
            return;
        } else {
            levelsArray.levels[currentLevelIndex].layer.setOpacity(0);
            levelsArray.levels[--currentLevelIndex].layer.setOpacity(0.6);

            translateSum -= 36;

            levelSwitcher.querySelectorAll('span').forEach(el => {
                el.style.transform = `translateY(${(-1) * translateSum}px)`;
        });
        }
    });
}



const LevelsModel = function(building) {
    this._building = building;
    this._currentLevel = this._building.defaultLevel;
    this._layers = {};

    this.init();
}

LevelsModel.prototype.init = function() {
    this._buildLevelsLayers();
    this._findDefaultLevelIndex();
}

LevelsModel.prototype._findDefaultLevelIndex = function() {
    this._defaultLevelIndex = this._layers.layers.findIndex(el => el.level == this._layers.defaultLevel);
}

LevelsModel.prototype._buildLevelsLayers = function() {
    this._layers = {
        defaultLevel: this._building.defaultLevel,
        layers: []
    };
    
    this._building.levels.forEach(floor => {
        this._layers.layers.push({
            level: floor.level,
            layer: new L.imageOverlay.rotated(
                floor.img,
                this._building.coords.topLeft,
                this._building.coords.topRight,
                this._building.coords.bottomLeft, {
                    opacity: this._building.defaultLevel == floor.level ? 1 : 0,
                    interactive: true
                }
            )
        });
    });
}

const LevelsView = function(model) {
    this.DOMstrings = {
        levelSwitcher: '.level-switcher',
        switchTop: '.switch-top',
        switchBottom: '.switch-bottom',
        levelContainer: '.levelContainer'
    }

    this._model = model;
    this._levelsLayers = [];
    this._levelSpans = [];
    this._container = null;
}

LevelsView.prototype._buildSwitcher = function() {
    const _levelSwitcherHTML = `
        <div class="level-switcher right-middle shadow">
            <button class="switch-top"><img src="./media/icons/next.svg" alt=""></button>
            <div class="level-container"></div>
            <button class="switch-bottom"><img src="./media/icons/next.svg" alt=""></button>
        </div>`;

    document.insertAdjacentHTML('beforend', _levelSwitcherHTML);
}

LevelsView.prototype.switchTop = function() {

}

LevelsView.prototype.switchBottom = function() {
    
}

LevelsView.prototype._setUpHandlers = function() {
    this.container = document.querySelector(this.DOMstrings.levelContainer);
    this.container.querySelector(this.DOMstrings.switchTop, () => {});
    this.container.querySelector(THIS.DOMstrings.switchBottom, () => {});
}

const lv = new LevelsModel(BuildingA);