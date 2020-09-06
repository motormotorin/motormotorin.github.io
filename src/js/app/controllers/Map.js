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


function Map() {
    this._map;

    this._masterPlacesLayers = {};
    this._masterBuildingsLayers = new L.LayerGroup();

    this.init();
    this.bildingsController = new MapBuildings(buildings, this._map);
}

Map.prototype = {
    init: function() {
        this._map = L.map('mapid', {
            zoomControl: false,
            minZoom: 16, 
            maxZoom: 20,
            preferCanvas: true,
            renderer: L.canvas()
        })
        .setView([43.02450002995938, 131.89426848759467], 13)
        .setMaxBounds([[43.01961, 131.88065],[43.03954, 131.90511]]);

        // 131.88065,43.01961,131.90511,43.03954

        var gl = L.mapboxGL({
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
            style: 'https://api.maptiler.com/maps/3e6107a7-760f-4855-ac6e-6c94360165c4/style.json?key=igVG6WwwjMMykgtyfqwM'
        }).addTo(this._map);
    },

    

    addPlacesLayers: function(layers) {
        if (!(layers instanceof Array)) layers = Object.values(layers);
        layers.forEach(layer => {
            this.addPlacesLayer(layer);
            //this.addPlaces(layer.id, layer.places);
        });
    },

    addPlacesLayer: function(l) {
        var featureGroup = L.geoJSON([], {
            onEachFeature: (feature, layer) => {
                layer._leaflet_id = feature.properties.id;
                layer.state = "inactive";
                layer.options.icon = L.icon({
                    iconUrl: `/media/placesicons/${feature.properties.icon || "default"}.svg`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10],
                    popupAnchor: [0, 0]
                });
                layer.setLatLng(feature.geometry.coordinates); 

                layer.on("click", (e) => {
                    console.log("click on place");
                    //this.selectPlaceEvent.notify(l.id, feature.properties.id);
                });
            }
        });
        
        this._masterPlacesLayers[l.id] = featureGroup;

        if (l.state === "active") featureGroup.addTo(this._map);
    },

    addPlaces: function(places, layerId) {
        if (!(places instanceof Array)) places = Object.values(places);
        places.forEach(place => {
            this.addPlaces(place, layerId);
        });
    },

    addPlace: function(place, layerId) {
        const feature = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [place.latlng.lat, place.latlng.lng]
            },
            properties: {
                id: place.id,
                icon: place.icon || "default",
            },
        }

        const layer = this._masterPlacesLayer.getLayer(layerId);
        layer.addData(feature);
    },

    addBuilding: function(building) {
        // if (!(building instanceof Building)) throw TypeError();


    },

    showLayer: function(layerId) {
        const layer = this._masterPlacesLayers[layerId];
        if (layer && !this._map.hasLayer(layer)) {
            layer.addTo(this._map);
        }
    },

    hideLayer: function(layerId) {
        const layer = this._masterPlacesLayers[layerId];
        if (layer && this._map.hasLayer(layer)) {
            this._map.removeLayer(layer);
        }
    }
}

export default Map;