function generateUnqueId(prefix) {
    if (prefix && typeof prefix === "string") {
        return prefix + "_" + Math.random().toString(36).substr(2,9);
    }
}

console.log(generateUnqueId("place"));


const placesLayers = {
    placesLayer_pe73zbwun: {
        id: "placesLayer_pe73zbwun",
        title: "Поесть",
        icon: "canteen.svg",
        places: {} 
    },
    placesLayer_0bfeky7y6: {
        id: "placesLayer_0bfeky7y6",
        title: "Покупки",
        icon: "buy.svg",
        places: {}
    },
    placesLayer_7j2i7g4ca: {
        id: "placesLayer_7j2i7g4ca",
        title: "Банки и Банкоматы",
        icon: "credit-card.svg",
        places: {}
    },
    placesLayer_b821zcztt: {
        id: "placesLayer_b821zcztt",
        title: "Медицина",
        icon: "pharmacy.svg",
        places: {} 
    },
    placesLayer_ncx52mogj: {
        id: "placesLayer_ncx52mogj",
        title: "Услуги",
        icon: "services.svg",
        places: {} 
    },
    placesLayer_oanemea8a: {
        id: "placesLayer_oanemea8a",
        title: "Копи. центры",
        icon: "printer.svg",
        places: {} 
    },
};

const layersJSON = JSON.stringify(placesLayers);







function MapObjects() {
    this._placesLayers = {};
    this._buildingsLayers = {};
}

MapObjects.prototype = {

    loadPlacesLayers: async function() {
        // const responce = await fetch("placesLayers.php");
        const responce = await layersJSON;
        this._placesLayers = await JSON.parse(responce);
        return this._placesLayers;
    },

    loadBuildingsLayers: async function() {
        return;
    },

    getPlacesLayer: function(layerId) {
        return this._placesLayers[layerId];
    },

    getPlacesLayers: function() {
        return this._placesLayers;
    },

    getPlace: function(layerId, placeId) {
        const layer = this.getPlacesLayer(layerId);
        const place = layer[placeId];
        return place;
    },

    getBuilding: function() {},
}

export default MapObjects;