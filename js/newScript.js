
const path = './Plans/BuildingA/';
const BuildingA = {
    defaultLevel: 6,

    coords: {
        topLeft:    { lat: 43.02536094583274, lng: 131.8936210870743  },
        topRight:   { lat: 43.02510603693426, lng: 131.8947905302048  },
        bottomLeft: { lat: 43.02408246900671, lng: 131.89299345016482 }
    },

    levels: [
        { level: '6',  img: `${path}Level-6.jpg`,  opacity: 0.6 },
        { level: '7',  img: `${path}Level-7.jpg`,  opacity: 0 }, 
        { level: '8',  img: `${path}Level-8.jpg`,  opacity: 0 },
        { level: '9',  img: `${path}Level-9.jpg`,  opacity: 0 },
        { level: '10', img: `${path}Level-10.jpg`, opacity: 0 },
        { level: '11', img: `${path}Level-11.jpg`, opacity: 0 },
        { level: '12', img: `${path}Level-12.jpg`, opacity: 0 }
    ],
};

var topLeft = BuildingA.coords.topLeft,
    topRight = BuildingA.coords.topRight,
    bottomLeft = BuildingA.coords.bottomLeft;

// var marker1 = L.marker(topLeft, {draggable: true} ).addTo(map),
//     marker2 = L.marker(topRight, {draggable: true} ).addTo(map),
//     marker3 = L.marker(bottomLeft, {draggable: true} ).addTo(map);
    
// var	bounds = new L.LatLngBounds(topLeft, topRight).extend(bottomLeft);

// map.fitBounds(bounds);

// overlay = L.imageOverlay.rotated("./Plans/BuildingA/Level-6.jpg", topLeft, topRight, bottomLeft, {
//     opacity: 0.4,
//     interactive: true,
// });

// function repositionImage() {
//     overlay.reposition(topLeft, topRight, bottomLeft);
// };

// // marker1.on('drag dragend', repositionImage);
// // marker2.on('drag dragend', repositionImage);
// // marker3.on('drag dragend', repositionImage);

// map.addLayer(overlay);

// function setOverlayOpacity(opacity) {
//     overlay.setOpacity(opacity);
// }



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

    levelsArray.levels.forEach(level => {
        var span = document.createElement('span');
        span.innerText = level.level;
        span.style.transform = `translateY(-${36 * defaultLevelIndex}px)`;
        spanArray.push(span);
    });

    map.fitBounds(new L.LatLngBounds(topLeft, topRight).extend(bottomLeft));

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
    levelContainer = document.querySelector('.level-container');
    spanArray.forEach(el => levelContainer.appendChild(el));  
    var translateSum = 0;
    var currentLevelIndex = defaultLevelIndex;

    levelSwitcher.querySelector('.switch-top').addEventListener('click', () => {
        if (currentLevelIndex + 1 >= spanArray.length) {
            return;
        } else {
            currentLevelIndex++;
            levelsArray.levels[currentLevelIndex - 1].layer.setOpacity(0);
            levelsArray.levels[currentLevelIndex].layer.setOpacity(0.6);
            translateSum += 36;
            levelSwitcher.querySelectorAll('span').forEach(el => {
                el.style.transform = `translateY(${(-1) * translateSum}px)`;
        });
        }
    });
    
    levelSwitcher.querySelector('.switch-bottom').addEventListener('click', () => {
        if (currentLevelIndex - 1 < 0) {
            return 
        } else {
            currentLevelIndex--;
            levelsArray.levels[currentLevelIndex + 1].layer.setOpacity(0);
            levelsArray.levels[currentLevelIndex].layer.setOpacity(0.6);
            translateSum -= 36;
            levelSwitcher.querySelectorAll('span').forEach(el => {
                el.style.transform = `translateY(${(-1) * translateSum}px)`;
        });
        }
    });
}
