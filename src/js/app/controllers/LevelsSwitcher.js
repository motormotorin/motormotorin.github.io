import LevelsSwitcherView from '../views/LevelsSwitcherView';
import imgOverlay from '../../Util/ImageOverlayRotate';

class LevelsSwitcher {
    constructor(map) {
        if (!(map instanceof L.Map)) throw TypeError();

        this._map = map;
        this.currentBuilding;
        this.currentLevel;
        this.levels = {};

        this.view = new LevelsSwitcherView();

        this.setupHandlers();
    }

    setupHandlers() {
        this.switchUpHandler = this.switchUp.bind(this);
        this.switchDownHandler = this.switchDown.bind(this);
        return this;
    }

    enable() {
        this.view.$levelUp.addEventListener("click", this.switchUpHandler);
        this.view.$levelDown.addEventListener("click", this.switchDownHandler);
    }

    disable() {
        this.view.$levelUp.removeEventListener("click", this.switchUpHandler);
        this.view.$levelDown.removeEventListener("click", this.switchDownHandler);
    }

    createBuildingLevels(building) {
        for (let level in building.levels) {
            var leafletLevel = imgOverlay(
                this._map, 
                building.levels[level], //img
                building._corners.topLeft, building._corners.topRight, building._corners.bottomLeft,
                { interactive: false, opacity: 0 }
            );
            
            this.levels[level] = leafletLevel;
            leafletLevel.addTo(this._map);

            if (building.defaultLevel == level) leafletLevel.setOpacity(1);
        }
    }

    selectBuilding(building) {
        if (this.currentBuilding && this.currentBuilding.id === building.id) return;

        this.currentBuilding = building;
        this.currentLevel = building.defaultLevel;

        this.createBuildingLevels(building);
        this.enable();
        this.view.show();
        this.view.setLevel(building.defaultLevel);
    }

    unselectBuilding() {
        if (this.currentBuilding !== undefined) {
            Object.values(this.levels).forEach(level => level.remove());
            this.currentBuilding = undefined;
            this.currentLevel = undefined; 
            this.levels = {};

            this.disable();
            this.view.hide();
            this.view.setLevel("");
        }
    }

    switchLevel(direction) {
        var newLevel = this.currentLevel + direction;

        if (newLevel >= 0 && this.levels[newLevel] !== undefined) {
            var prevLevel = this.currentLevel;
            this.currentLevel = newLevel;

            this.levels[prevLevel].setOpacity(0);
            this.levels[this.currentLevel].setOpacity(1);
            this.view.setLevel(newLevel);
        }
    }

    switchUp() {
        this.switchLevel(1);
    }

    switchDown() {
        this.switchLevel(-1);
    }

    hasSelectedBuilding() {
        return this.currentBuilding !== undefined;
    }
}

export default LevelsSwitcher;