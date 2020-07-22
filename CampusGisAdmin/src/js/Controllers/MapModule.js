
function Layer() {
    var _layers = Object.create({});

    return {
        set: function (layerId, layer) {
            _layers[layerId] = layer;
        },
        get: function (layerId) {
            return _layers[layerId] || null;
        },
        delete: function (layerId) {
            if (_layers[layerId]) {
                delete _layers[layerId];
            }
        }
    }
}

function MapModule() {
    this._map = L.map('mapid')
    .setView([43.02825898949743, 131.89296126365664], 13)
    .setMaxBounds([[43.050952, 131.85915],[42.994509, 131.94232]]);

    this._geoJsonLayers = new Layer();
    this.init();
}

MapModule.prototype.init = function() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 15,
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this._map);
}

MapModule.prototype.addLayer = function(layerId) {
    var featureGroup = L.geoJSON([], {

        onEachFeature: (feature, layer) => {
            layer.id = feature.properties.id;
            layer.options.icon = L.icon({
                iconUrl: `/media/${feature.properties.icon}.svg`,
                iconSize: [20, 20],
				iconAnchor: [0, 0],
				popupAnchor: [0, 0]
            });
            layer.setLatLng(feature.geometry.coordinates);
            
            layer.on("click", (e) => {
                this._map.setView(feature.geometry.coordinates);
                // notify about click to observer or call param function 
            });
        }
    });


    this._geoJsonLayers.set(layerId, featureGroup);
    this._map.addLayer(featureGroup);
}

MapModule.prototype.deleteLayer = function(layerId) {
    const layer = this._geoJsonLayers.get(layerId);
    if (layer && this._map.hasLayer(layer)) {
        this._map.removeLayer(layer);
    }
    this._geoJsonLayers.delete(layerId);
}

MapModule.prototype.showLayer = function(layerId) {
    const layer = this._geoJsonLayers.get(layerId);
    if (layer && !this._map.hasLayer(layer)) {
       this._map.addLayer(layer);
   } 
}

MapModule.prototype.hideLayer = function(layerId) {
    const layer = this._geoJsonLayers.get(layerId);
    if (layer && this._map.hasLayer(layer)) {
        this._map.removeLayer(layer);
    }
}

MapModule.prototype.addMarker = function(layerId, marker) {
    const feature = {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [marker.latlng.lat, marker.latlng.lng]
        },
        properties: {
            id: marker.id,
            icon: marker.icon
        }
    }

    const layer = this._geoJsonLayers.get(layerId);
    if (layer) {
        layer.addData(feature);
    }
}

MapModule.prototype.deleteMarker = function(layerId, markerId) {
    const layer = this._geoJsonLayers.get(layerId);
    if (layer) {
        layer.eachLayer(marker => {
            marker.feature.properties.id === markerId ? layer.removeLayer(marker) : undefined;
        });
    }
}

export default MapModule;