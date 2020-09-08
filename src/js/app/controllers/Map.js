import MapBuildings from './MapBuildings';
import LayersController from './LayersController';
import DescriptionsController from './DescriptionsController';

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


class Map {
    constructor() {
        this._map;
        this.layers = {};
        this.localStorageLayers = JSON.parse(localStorage.getItem("layers")) || {};
    
        this.masterLayer = new L.LayerGroup([]);
        this.descriptionsController = new DescriptionsController();
        this.layersController = new LayersController();

        this.init();
        
        const loadLayer = async (name) => {
            const response = await fetch(`./json/${name}.json`);
            const data = await response.json();
 
            this.addLayer(data);
            this.addFeatures(Object.values(data.places), data.id);
        }

        loadLayer('layer_7gdt8bfan');
        loadLayer('layer_a84waq888');
        loadLayer('layer_z2zzty2yz');
    }

    init() {
        this._map = L.map('mapid', {
            zoomControl: false,
            minZoom: 16, 
            maxZoom: 20,
        })
        .setView([43.02450002995938, 131.89426848759467], 13)
        .setMaxBounds([[43.01961, 131.88065],[43.03954, 131.90511]]);

        var gl = L.mapboxGL({
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
            style: 'https://api.maptiler.com/maps/3e6107a7-760f-4855-ac6e-6c94360165c4/style.json?key=igVG6WwwjMMykgtyfqwM'
        }).addTo(this._map);

        this.masterLayer.addTo(this._map);
        this.bildingsController = new MapBuildings(buildings, this._map);

        this.layersController.selectLayerEvent.attach(this.selectLayer.bind(this));

        return this;
    }

    addLayers(layers) {
        if (!(layers instanceof Array)) layers = [layers];
        layers.forEach(layer => {
            this.addLayer(layer);
        });
    }


    addLayer(layer) {
        var featureGroup = L.geoJSON([], {
            onEachFeature: (feature, leafletLayer) => {
                let size = Number.parseInt(layer.markersSize);
                leafletLayer.id = feature.properties.id;
                leafletLayer.options.icon = L.icon({
                    iconUrl: `./media/icons/${(feature.properties.icon === "default" ? undefined : feature.properties.icon) || layer.markersIcon || "default"}.svg`,
                    iconSize: [size, size],
                    iconAnchor: [size/2 , size/2],
                });

                leafletLayer.on("click", (e) => {
                    // e.originalEvent.stopPropagation();

                    if (feature.properties.description) {
                        this.descriptionsController.printDescription(feature.properties.description);
                    }
                    this._map.setView(e.target.getLatLng(), 17);
                });
            }
        });

        featureGroup.maxZoom = layer.maxZoom;
        featureGroup.minZoom = layer.minZoom;
        
        this.layers[layer.id] = featureGroup;

        var lclStrgLayerState = this.localStorageLayers[layer.id];
        if (lclStrgLayerState) {
            lclStrgLayerState === "active" ? this.masterLayer.addLayer(featureGroup) : undefined;
            this.layersController.addLayer({id: layer.id, title: layer.title, icon: layer.markersIcon, state: lclStrgLayerState});
        } else {
            this.setToStorage({id: layer.id, state: "active"});
            this.masterLayer.addLayer(featureGroup);
            this.layersController.addLayer({id: layer.id, title: layer.title, icon: layer.markersIcon, state: "active"});
        }

        // this.masterLayer.addLayer(featureGroup);
        // this.layersController.addLayer({id: layer.id, title: layer.title, icon: layer.markersIcon});
    }

    addFeatures(features, parentLayerId) {
        if (!(features instanceof Array)) features = [features];
        var layer = this.layers[parentLayerId];
        layer ? layer.addData(features) : void 0;
    }

    showLayer(layerId) {
        const layer = this.layers[layerId];
        if (layer && !this.masterLayer.hasLayer(layer)) {
            this.masterLayer.addLayer(layer);
        }
    }

    hideLayer(layerId) {
        const layer = this.layers[layerId];
        if (layer && this.masterLayer.hasLayer(layer)) {
            this.masterLayer.removeLayer(layer);
        }   
    }

    selectLayer(layer) {
        layer.state === "active" 
            ? this.showLayer(layer.id)
            : this.hideLayer(layer.id);
        
        this.setToStorage(layer);
    }

    setToStorage(layer) {
        this.localStorageLayers[layer.id] = layer.state;

        localStorage.removeItem("layers");
        localStorage.setItem("layers", JSON.stringify(this.localStorageLayers));
    }
}

export default Map;