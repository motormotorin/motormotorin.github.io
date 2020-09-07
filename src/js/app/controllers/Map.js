import MapBuildings from './MapBuildings';

import A_contour from '../../../media/buildings/A/A_contour.svg';
import A_6 from '../../../media/buildings/A/A_6.svg';
import A_7 from '../../../media/buildings/A/A_7.svg';
import A_8 from '../../../media/buildings/A/A_8.svg';

const buildings = {
    "building_0x12idww": {
        id: "building_0x12idww",
        building: "A",
        defaultLevel: 6,
        levels: {
            6: A_6,
            7: A_7,
            8: A_8
        },
        _contour: A_contour,
        _corners: {
            topLeft:    { lat: 43.02507858514359, lng: 131.8935137987137  },
            topRight:   { lat: 43.02479622315571, lng: 131.89463496208194 },
            bottomLeft: { lat: 43.02421869798665, lng: 131.8931120321577  }
        }
    }
}


class Map {
    constructor() {
        this._map;
        this.layers = {};
        this.masterLayer = new L.LayerGroup([]);
        this._masterBuildingsLayers = new L.LayerGroup();

        this.init();
        this.loadLayers();

        this.bildingsController = new MapBuildings(buildings, this._map);
    }

    init() {
        this._map = L.map('mapid', {
            zoomControl: false,
            minZoom: 16, 
            maxZoom: 20,
        })
        .setView([43.02450002995938, 131.89426848759467], 13)
        .setMaxBounds([[43.01961, 131.88065],[43.03954, 131.90511]]);

        var gl = L.mapboxGL({
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
            style: 'https://api.maptiler.com/maps/3e6107a7-760f-4855-ac6e-6c94360165c4/style.json?key=igVG6WwwjMMykgtyfqwM'
        }).addTo(this._map);

        this.masterLayer.addTo(this._map);

        return this;
    }

    async loadLayers() {
        try {
            const response = await fetch("php/getJsonNames.php", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
            const data = await response.json();
    
            console.log("map");
            console.log(data);
        } catch(e) {
            console.error("[map]: " + e);
        }
    }

    addLayers(layers) {
        if (!(layers instanceof Array)) layers = [layers];
        layers.forEach(layers => {
            this.addLayer(layer);
        });
    }


    addLayer(layer) {
        var featureGroup = L.geoJSON([], {
            onEachFeature: (feature, leafletLayer) => {
                let size = leafletLayer.markersSize;

                leafletLayer.id = feature.properties.id;
                leafletLayer.options.icon = L.icon({
                    iconUrl: `./media/icons/${layer.markersIcon || "default"}.svg`,
                    iconSize: [size, size],
                    iconAnchor: [size/2 , size/2],
                });

                leafletLayer.setLatLng(feature.geometry.coordinates); 

                leafletLayer.on("click", (e) => {
                    this._map.setView(e.target.getLatLng());
                });
            }
        });

        featureGroup.maxZoom = layer.maxZoom;
        featureGroup.minZoom = layer.minZoom;
        
        this.masterLayer.addLayer(featureGroup)

        if (l.state === "active") featureGroup.addTo(this._map);
    }

    addFeatures(features, parentLayerId) {
        if (!(features instanceof Array)) features = [features];
        var layer = this.layers[parentLayerId];
        layer ? layer.addData(features) : void 0;
    }


    // showLayer: function(layerId) {
    //     const layer = this._masterPlacesLayers[layerId];
    //     if (layer && !this._map.hasLayer(layer)) {
    //         layer.addTo(this._map);
    //     }
    // },

    // hideLayer: function(layerId) {
    //     const layer = this._masterPlacesLayers[layerId];
    //     if (layer && this._map.hasLayer(layer)) {
    //         this._map.removeLayer(layer);
    //     }
    // }
}

export default Map;