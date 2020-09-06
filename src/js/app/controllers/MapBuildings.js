import imgOverlay from '../../Util/ImageOverlayRotate';
import LevelsSwitcher from './LevelsSwitcher';

class MapBuildings {
    constructor(buildings, map) {
        this._map = map;
        this.buildings = buildings;

        this.masterBuildingsLayer = new L.FeatureGroup([]);
        this.levelsSwitcher = new LevelsSwitcher(this._map);

        this.masterBuildingsLayer.addTo(this._map);

        this.enable()
            .renderBuildingsContours(this.buildings);
    }

    setupHandlers() {}

    enable() {

        this._map.on("moveend zoomend", () => {
            var mapCenter = this._map.getBounds().getCenter();
            var focusedBuilding = this.masterBuildingsLayer.getLayers().find(layer => 
                layer.getBounds().contains(mapCenter)
            );

            if (focusedBuilding && this._map.getZoom() >= 18) {
                this.levelsSwitcher.selectBuilding(this.buildings[focusedBuilding._customId]);
            } else if (this.levelsSwitcher.hasSelectedBuilding()) {
                this.levelsSwitcher.unselectBuilding();
            }
        });
        
        return this;
    }

    renderBuildingsContours() {
        var buildingsArray = this.buildings instanceof Array 
            ? this.buildings
            : Object.values(this.buildings);
        
        buildingsArray.forEach((building) => {
            var buildingContourLayer = imgOverlay(
                this._map, 
                building._contour,
                building._corners.topLeft,
                building._corners.topRight,
                building._corners.bottomLeft, 
                {
                    interactive: true,
                }
            );
                
            buildingContourLayer._customId = building.id;
            this.masterBuildingsLayer.addLayer(buildingContourLayer);
        });
        return this;
    }
}

export default MapBuildings;