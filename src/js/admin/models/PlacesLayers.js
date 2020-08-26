import PlacesLayer from './PlacesLayer';

function PlacesLayers(placesLayers) {
    this.layers = {};

    if (placesLayers)
        this.setLayers(placesLayers);
}

PlacesLayers.prototype = {

    setLayers: function(layers) {
        if (typeof layers === "string") {
            layers = JSON.parse(layers);
        }
        
        for (let layerId in layers) {
            this.layers[layerId] = new PlacesLayer(layers[layerId]);
        }
    },

    getLayer: function(layerId) {
        return this.hasLayer(layerId)
            ? this.layers[layerId]
            : {}
    },

    getLayers: function() {
        return this.layers;
    },

    getLayersForMenu: function() {
        const menuLayers = [];
        for (let layerId in this.layers) {
            menuLayers.push({id: layerId, title: this.layers[layerId].title});
        }
        return menuLayers;
    },

    hasLayer: function(layerId) {
        return this.layers.hasOwnProperty(layerId);
    }
}

export default PlacesLayers;