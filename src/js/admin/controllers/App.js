import MapData from '../models/MapData';
import Map from './Map';
import Aside from './Aside';
import Evt from '../../Util/Event';
import Header from './Header';


function App() {

    this.mapData = new MapData();
    this.map = new Map(); 

    this.header = new Header();
    this.aside = new Aside();


    this.mapData.loadAllData()
        .then((mapData) => {
            const placesLayers = mapData.getPlacesLayers();
            const placesLayersForMenu = mapData.getPlacesLayersForMenu();

            this.map.addPlacesLayers(placesLayers);
            this.header.setLayers(placesLayersForMenu);
        })
        .catch((e) => console.log(e));

    this.setupHandlers().enable();
}

App.prototype = {
    setupHandlers: function() {

        //map actions handlers 
        this.addPlaceHandler = this.addPlace.bind(this);
        this.changePlacePositionHandler = this.changePlacePosition.bind(this);
        this.selectPlaceHandler = this.selectPlace.bind(this);
        this.unselectPlaceHandler = this.unselectPlace.bind(this);


        //header actions handlers 
        this.selectTypeHandler = this._selectType.bind(this);

        //panels actions handlers
        this.changePlaceIconHandler = this.changePlaceIcon.bind(this);

        return this;
    },

    enable: function() {
        this.map.addPlaceEvent.attach(this.addPlaceHandler);
        this.map.selectPlaceEvent.attach(this.selectPlaceHandler);
        this.map.unselectPlaceEvent.attach(this.unselectPlaceHandler);
        this.map.changePlacePositionEvent.attach(this.changePlacePositionHandler);

        this.header.selectTypeEvent.attach(this.selectTypeHandler);


        this.aside.placeEditingPanel.changePlaceIconEvent.attach(this.changePlaceIconHandler);

        return this;
    },

    _selectType: function(type, id, arg) {
        switch(type) {
            case "layer": 
                this.map.enablePlaceAdding(id); 
                break;

            case "building": 
                console.log(arg);
                break;
            case "save": console.log("save"); break;
            case "remove": console.log("remove"); break;
        }
    },

    addPlace: function(layerId, place) {
        this.mapData.setPlace(layerId, place);
    },

    selectPlace: function(layerId, placeId) {
        const place = this.mapData.getPlace(layerId, placeId);
        this.aside.selectPanel('place', layerId, place);
    },

    unselectPlace: function() {
        this.aside.unselectPanel();
    },

    changePlacePosition: function(layerId, placeId, position) {
        console.log("change position");
        // const place = this.mapData.getPlace(layerId, placeId);
        // place.latlng = position;
    },

    changePlaceIcon: function(layerId, placeId, icon) {
        this.map.setPlaceIcon(layerId,placeId, icon);
    }

}

export default App;