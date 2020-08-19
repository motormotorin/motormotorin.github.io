const placesLayers = {
    placesLayer_pe73zbwun: {
        id: "placesLayer_pe73zbwun",
        title: "Поесть",
        icon: "./media/layers/canteen.svg",
        places: {} 
    },
    placesLayer_0bfeky7y6: {
        id: "placesLayer_0bfeky7y6",
        title: "Покупки",
        icon: "./media/layers/buy.svg",
        places: {}
    },
    placesLayer_7j2i7g4ca: {
        id: "placesLayer_7j2i7g4ca",
        title: "Банки и Банкоматы",
        icon: "./media/layers/credit-card.svg",
        places: {}
    },
    placesLayer_b821zcztt: {
        id: "placesLayer_b821zcztt",
        title: "Медицина",
        icon: "./media/layers/pharmacy.svg",
        places: {} 
    },
    placesLayer_ncx52mogj: {
        id: "placesLayer_ncx52mogj",
        title: "Услуги",
        icon: "./media/layers/services.svg",
        places: {} 
    },
    placesLayer_oanemea8a: {
        id: "placesLayer_oanemea8a",
        title: "Копировальные центры",
        icon: "./media/layers/printer.svg",
        places: {} 
    },
};

const layersJSON = JSON.stringify(placesLayers);







function MapData() {
    this._placesLayers = {};
    this._buildingsLayers = {};
}

MapData.prototype = {

    loadPlacesLayers: async function() {
        // const responce = await fetch("placesLayers.php");
        const responce = await layersJSON;
        this._placesLayers = await JSON.parse(responce);
        return this._placesLayers;
    },

    loadBuildingsLayers: async function() {
        return;
    },

    getPlaceLayer: function(layerId) {
        return this._placesLayers[layerId];
    },

    getPlacesLayers: function() {
        return this._placesLayers;
    },

    getPlace: function(layerId, placeId) {
        const layer = this.getPlaceLayer(layerId);
        const place = layer[placeId];
        return place;
    },

    getBuilding: function() {},
}

export default MapData;