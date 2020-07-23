import { 
    layersContainerDOM as elements, 
    elementDOM as item 
} from '../Util/Base';

import LayersContainerView from '../Views/LayersContainerView';

import Layer from '../Models/Layer';
import Event from '../Util/Event';


function LayersContainer(data) {
    this.layers = data || [];
    this._lContView = new LayersContainerView();
    
    this.initHandlers();
} 

LayersContainer.prototype = Object.create(Event.prototype);

LayersContainer.prototype.initHandlers = function() {

    // toolbar events: toggle btn; add layer; delete layer;
    this._lContView.toolbar.addEventListener("click", (e) => {
        if (e.target.closest(`.${elements.toolbarToggleBtn}`)) {
            this._lContView.toggleContainer();

        } else if (e.target.closest(`#${elements.addBtnID}`)) {
            this.addNewLayer();

        } else if (e.target.closest(`#${elements.delBtnID}`)) {
            this.deleteLayer();
        } 
    });

    // container events: select layer; save layer;
    this._lContView.container.addEventListener("click", (e) => {
        if (e.target.closest(`#${item.itemSaveBtnID}`)) {
            let layerId = e.target.closest(`.${item.item}`).id;
            this.saveLayer(layerId);

        } else if (e.target.closest(`.${item.item}`)) {
            let layerId = e.target.closest(`.${item.item}`).id;
            this.selectLayer(layerId);
        }
    });

    // container events: enable input of element row
    this._lContView.container.addEventListener("dblclick", (e) => {
        if (e.target.className === item.itemInput) {
            let layerId = e.target.closest(`.${item.item}`).id;

            e.target.disabled = false;
            e.target.focus();

            this._lContView.highlightSelectedLayer(layerId);
        }
    });

    // container events: change value of layer with input value and set state(saved, unsaved);
    this._lContView.container.addEventListener("input", (e) => {
        const layerId = e.target.closest(`.${item.item}`).id;
        const layer = this.layers.find(layer => layer.id === layerId);

        layer.title === e.target.value 
            ? this._lContView.setAsSaved(layerId) 
            : this._lContView.setAsUnsaved(layerId);
    });

    // container events: on change input value disable  
    this._lContView.container.addEventListener("change", (e) => {
        e.target.blur();
        e.target.disabled = true;
    });

    // container events: on focusout from layer element
    this._lContView.container.addEventListener("focusout", (e) => {
        e.target.disabled = true;
    });
}


LayersContainer.prototype.update = function(newlayers) {
    this._lContView.clearContainer();
    this.layers = newlayers;
    this.layers.forEach(layer => {
        this._lContView.renderLayer(layer);
    });
}

LayersContainer.prototype.selectLayer = function(layerId) {
    this._lContView.highlightSelectedLayer(layerId);

    const layer = this.layers.find(layer => layer.id === layerId);
    if (layer.state == "saved") {
        this.emit("layerSelected", []);
    }
}

LayersContainer.prototype.addNewLayer = function() {
    const newLayer = new Layer();

    this.layers.push(newLayer);
    this._lContView.renderLayer(newLayer);

    this.emit("layerAdded", []);
}

LayersContainer.prototype.saveLayer = function(layerId) {
    const layer = this.layers.find(layer => layer.id === layerId);
    layer.title = this._lContView.getInputValue(layerId);
    layer.state = "saved";

    this._lContView.setAsSaved(layerId);

    if (layer.id === this._lContView.getSelectedLayerId()) {
        this.emit("layerSelected", []);
    }
    // -- maker server request
    // -- play animation 
    // -- on succes changeSaveIcon
    // -- on faoilure show error
}

LayersContainer.prototype.deleteLayer = function() {
    const selectedLayerId = this._lContView.getSelectedLayerId();
    const selectedLayer = this.layers.find(layer => layer.id === selectedLayerId);

    if (selectedLayer) {
        if (selectedLayer.state === "new") {
            this.layers = this.layers.filter(layer => layer.id !== selectedLayer.id);
            this._lContView.clearLayer(selectedLayerId);

            this.emit("layerDeleted");
        } else {
            console.log("server request on deleting");
        }
    }
} 

export default LayersContainer;