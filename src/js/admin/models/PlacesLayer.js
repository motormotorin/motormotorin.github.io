import Place from './Place';

function PlacesLayer(layer) {
    this.id;
    this.title;
    this.places = {};

    if (layer)
        this.setLayer(layer);
}

PlacesLayer.prototype = {
    setLayer: function(layer) {
        if (typeof layer === "string") {
            layer = JSON.parse(layer);
        }
        this.id = layer.id;
        this.title = layer.title;
        
        this.setPlaces(layer.places);
    },

    setPlaces: function(places) {
        if (typeof places === "string") {
            places = JSON.parse(places);
        }

        for (let placeId in places) {
            this.places[placeId] = new Place(places[placeId]);
        }
    },

    setPlace: function(place) {
        this.places[place.id] = place;
    },

    getPlace: function(placeId) {
        return this.hasPlace(placeId)
            ? this.places[placeId]
            : {};
    },

    getPlaces: function() {
        return this.places;
    },

    removePlace: function(placeId) {
        this.hasPlace(placeId) 
            ? delete this.places[placeId]
            : undefined;
    },

    hasPlace: function(placeId) {
        return this.places.hasOwnProperty(placeId);
    },
}

export default PlacesLayer;

