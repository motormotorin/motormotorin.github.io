import Evt from '../../Util/Event';
import Place from '../models/Place';


function Map(mapData) {
    this._map;

    this.masterPlacesLayer = new L.LayerGroup();

    this._pointingMarker;
    this._highlightMarker;

    this._selectedPlace;
    this._activeMapListeners = {};

    this.selectPlaceEvent = new Evt();
    this.unselectPlaceEvent = new Evt();
    this.addPlaceEvent = new Evt();
    this.changePlacePositionEvent = new Evt();

    this._init();
}

Map.prototype = {

    _init: function() {
        this._map = L.map('mapid', { zoomControl: false })
            .setView([43.02825898949743, 131.89296126365664], 13)
            .setMaxBounds([[43.050952, 131.85915],[42.994509, 131.94232]]);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 16, maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(this._map);

        this.masterPlacesLayer.addTo(this._map);

        return this;
    },

    _getLayer: function(layerId) {
        const layers = this.masterPlacesLayer.getLayers();
        return layers.find(layer => layer._customId === layerId);
    },

    _getPlace: function(layerId, placeId) {
        const layer = this._getLayer(layerId);
        if (layer) {
            const places = layer.getLayers();
            return places.find(place => place._customId === placeId);
        }
        return undefined;
    },

    addPlacesLayers: function(layers) {
        if (!(layers instanceof Array)) layers = Object.values(layers);
        layers.forEach(layer => this.addPlacesLayer(layer));
    },

    addPlacesLayer: function(layer) {
        var featureGroup = L.featureGroup([]);
        featureGroup._customId = layer.id;

        featureGroup.on("layeradd", (e) => {
            var marker = e.layer; 
            marker._state = "inactive";

            marker.on("click", (e) => {
                this._togglePlaceSelection(marker);
            });

            marker.on("drag", (e) => {
                var pos = e.target.getLatLng();
                var newPos = new L.LatLng(pos.lat, pos.lng);

                if (this._highlightMarker) {
                    this._highlightMarker.setLatLng(newPos, {'draggable': true});
                }
            })

            marker.on("dragend", (e) => {
                var pos = e.target.getLatLng();
                var newPos = new L.LatLng(pos.lat, pos.lng);

                marker.setLatLng(newPos, {'draggable': true});
                
                this.changePlacePositionEvent.notify(marker._customId);
            });
        });
        
        this.masterPlacesLayer.addLayer(featureGroup);
        this.addPlaces(layer.id, layer.places);
    },

    addPlaces: function(layerId, places) {
        if (!(places instanceof Array)) places = Object.values(places);
        places.forEach(place => {
            this.addPlace(layerId, place);
        });
    },

    addPlace: function(layerId, place) {
        const newPlaceMarker = this._createPlaceMarker(place);
        const layer = this._getLayer(layerId);

        if (layer) {
            layer.addLayer(newPlaceMarker);
        }
        
        return newPlaceMarker;
    },

    _createPlaceMarker: function(place) {
        const newPlace = L.marker(place.latlng);
        newPlace._customId = place.id;
        newPlace.setIcon(new L.Icon({
            iconUrl: `/media/icons/${place.icon || "default"}.svg`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        }));

        return newPlace;
    },

    _createPointingMarker: function() {
        var icon = L.icon({
            iconUrl: `/media/icons/default.svg`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, 0]
        });

        var marker = new L.Marker();
        marker.setIcon(icon);

        return marker;
    },

    _createHighlightMarker: function() {
        const icon = L.divIcon({
            className: 'css-icon',
            html: '<div class="gps_ring"></div>',
            iconSize: [40,40],
            iconAnchor: [20,20]
        });

        var marker = L.marker();
        marker.setIcon(icon);

        return marker;
    },

    enablePlaceAdding: function(layerId) {
        this.disablePlaceAdding();
        this._pointingMarker = this._createPointingMarker();

        function mouseOver(e) {
            this._pointingMarker.setLatLng(e.latlng);
            this._pointingMarker.addTo(this._map);

            this._map.off("mouseover", mouseOverHandler);
        }

        function mouseMove(e) {
            this._pointingMarker.setLatLng(e.latlng);
        }

        function mouseClick(e) {
            var place = new Place(e.latlng);

            const placeMarker = this.addPlace(layerId, place);
            this.addPlaceEvent.notify(layerId, place);

            this.disablePlaceAdding();
            this._togglePlaceSelection(placeMarker);
        }

        const mouseOverHandler = mouseOver.bind(this);
        const mouseMoveHandler = mouseMove.bind(this);
        const mouseClickHandler = mouseClick.bind(this);

        this._map.on("mouseover", mouseOverHandler);
        this._map.on("mousemove", mouseMoveHandler);
        this._map.on("click", mouseClickHandler);

        this._activeMapListeners["mousemove"] = mouseMoveHandler;
        this._activeMapListeners["click"] = mouseClickHandler;
    },

    disablePlaceAdding: function() {
        if (this._pointingMarker !== undefined) {
            this._map.removeLayer(this._pointingMarker);
        }

        if (this._activeMapListeners) {
            for (let key in this._activeMapListeners) {
                this._map.off(key, this._activeMapListeners[key]);
            }
        }

        this._activeMapListeners = {};
    },

    _togglePlaceSelection: function(placeMarker) {
        if (placeMarker._state === "inactive") {
            this.selectPlace(placeMarker)
        } else if (placeMarker._state === "active") {
            this.unselectPlace(placeMarker);
        }
    },

    selectPlace: function(place) {
        place._state = "active";
        place.dragging.enable();

        if (this._selectedPlace) {
            this._unselectPreviousPlace();       
        }

        this._highlightMarker = this._createHighlightMarker();
        this._highlightMarker
            .setLatLng(place.getLatLng())
            .setZIndexOffset(-1)
            .addTo(this._map);

        this._selectedPlace = place;

        const parentLayerId = Object.values(place._eventParents)[0]._customId;
        this.selectPlaceEvent.notify(parentLayerId, place._customId);
    },

    _unselectPreviousPlace: function() {
        if (this._selectedPlace) {
            this.unselectPlace(this._selectedPlace);
        }
    },

    unselectPlace: function(place) {
        place._state = "inactive";
        place.dragging.disable();

        if (this._highlightMarker) {
            this._highlightMarker.remove();
            this._highlightMarker = undefined;
        }
    
        this._selectedPlace = undefined;

        const parentLayerId = Object.values(place._eventParents)[0]._customId;
        this.unselectPlaceEvent.notify(parentLayerId, place._customId);
    },

    setPlaceIcon: function(layerId, placeId, iconName) {
        const place = this._getPlace(layerId, placeId);
        const icon = L.icon({
            iconUrl: `/media/icons/new/${iconName || "default"}.svg`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
        });

        place.setIcon(icon);
    }

}

export default Map;