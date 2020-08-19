
function Map() {
    this._map;

    this._masterPlacesLayers = {};
    this._masterBuildingsLayers = new L.LayerGroup();

    this.init();
}

Map.prototype = {
    init: function() {
        this._map = L.map('mapid', {zoomControl: false})
            .setView([43.02825898949743, 131.89296126365664], 13)
            .setMaxBounds([[43.050952, 131.85915],[42.994509, 131.94232]]);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 15,
            maxZoom: 19, //max zoom for openstreetmaps
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(this._map);

        //this._masterPlacesLayers.addTo(this._map);
        //this._masterBuildingsLayers.addTo(this._map);
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