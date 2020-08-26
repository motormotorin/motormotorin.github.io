import Evt from '../../Util/Event';
import PlacesLayers from './PlacesLayers';
import Place from './Place';

const placesLayers = {
    placesLayer_0bfeky7y6: {
        id: "placesLayer_0bfeky7y6",
        title: "Услуги",
        places: {}
    },
    placesLayer_7j2i7g4ca: {
        id: "placesLayer_7j2i7g4ca",
        title: "Покупки",
        places: {}
    },
    placesLayer_b821zcztt: {
        id: "placesLayer_b821zcztt",
        title: "Банки и Банкоматы",
        places: {} 
    },
    placesLayer_ncx52mogj: {
        id: "placesLayer_ncx52mogj",
        title: "Офисы",
        places: {} 
    },
    placesLayer_oanemea8a: {
        id: "placesLayer_oanemea8a",
        title: "Копировальные услуги",
        places: {} 
    },
    placesLayer_pe73zbwun: {
        id: "placesLayer_pe73zbwun",
        title: "Кафе",
        places: {} 
    },
    placesLayer_u372ht5yx: {
        id: "placesLayer_u372ht5yx",
        title: "Аптеки",
        places: {} 
    }
};

const placesLayersJSON = JSON.stringify(placesLayers);

function MapData() {
    this.placesLayers;
    this.buildingsLayers;

    this.loadLayersEvent = new Evt(this);
    this.loadBuildingsEvent = new Evt(this);

    this.loadPlacesLayers();
}

MapData.prototype = {
    loadAllData: async function() {
        await this.loadPlacesLayers();
        await this.loadBuildings();
        return this;
    },

    loadPlacesLayers: async function() {
        // return fetch("url")
        //     .then((data) => {
        //         this.placesLayers = new PlacesLayers(data);          
        //     });
        //
        this.placesLayers = new PlacesLayers(placesLayersJSON);
    },

    getPlacesLayers: function() {
        return this.placesLayers.getLayers();
    },

    getPlacesLayersForMenu: function() {
        return this.placesLayers.getLayersForMenu();
    },

    setPlace: function(layerId, place) {
        const layer = this.placesLayers.getLayer(layerId);
        layer.setPlace(place);
    },

    getPlace: function(layerId, placeId) {
        const layer = this.placesLayers.getLayer(layerId);
        const place = layer.getPlace(placeId);
        return place;
    },

    removePlace: function(layerId, placeId) {
        const layer = this.placesLayers.getLayer(layerId);
        layer.removePlace(placeId);
    },

    loadBuildings: async function() {
        return;
    },
}


export default MapData;