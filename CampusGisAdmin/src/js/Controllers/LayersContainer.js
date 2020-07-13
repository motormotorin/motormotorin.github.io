import { layersContainerDOM, elementDOM } from '../Util/Base';
import LayersContainerView from '../Views/LayersContainerView';
import Layer from '../Models/Layer';


function LayersContainer(data) {
    this.layers = data || [];
    this.selectedLayer = null;

    this._lContView = LayersContainerView.init();
    this.initHandlers();
} 

LayersContainer.prototype.initHandlers = function() {
    this.container = document.querySelector(`.${layersContainerDOM.container}`);
    this.toolbar = document.querySelector(`#${layersContainerDOM.toolbarID}`);

    this.toolbar.addEventListener("click", (e) => {
        if (e.target.closest(`#${layersContainerDOM.acordionID}`)) {
            this._lContView.toggleContainer();

        } else if (e.target.closest(`#${layersContainerDOM.addBtnID}`)) {
            this.addNewLayer();

        } else if (e.target.closest(`#${layersContainerDOM.delBtnID}`)) {
            this.delLayer();
        } 
    });

    this.container.addEventListener("click", (e) => {
        if (e.target.closest(`.${elementDOM.item}`)) {
            let item = e.target.closest(`.${elementDOM.item}`);
            this.selectLayer(item);
        }

        if (e.target.closest(`#${elementDOM.itemSaveBtnID}`)) {
            let item = e.target.closest(`.${elementDOM.item}`);
            this.saveLayer(item);
        }
    });

    this.container.addEventListener("dblclick", (e) => {
        if (e.target.className === elementDOM.itemInput) {
            let item = e.target.closest(`.${elementDOM.item}`);
            e.target.disabled = false;
            e.target.focus();
            this._lContView.highlightSelectedLayer(item);
        }
    });

    this.container.addEventListener("input", (e) => {
       const item = e.target.closest(`.${elementDOM.item}`);
       const layer = this.layers.find(layer => layer.id === item.id);
       layer.title === e.target.value ? this._lContView.setAsSaved(item) 
        : this._lContView.setAsUnsaved(item);
    });

    this.container.addEventListener("change", (e) => {
        e.target.blur();
        e.target.disabled = true;
    });

    this.container.addEventListener("focusout", (e) => {
        e.target.disabled = true;
    });
}


LayersContainer.prototype.update = function(newlayers) {
    this.layers = newlayers;
    this.selectedLayer = null;
    this._lContView.clearAll();

    this.layers.forEach(layer => {
        this._lContView.renderLayer(layer);
    });
}

LayersContainer.prototype.selectLayer = function(item) {
    this.selectedLayer = item;
    this._lContView.highlightSelectedLayer(item);
}

LayersContainer.prototype.addNewLayer = function() {
    const newLayer = new Layer();
    this.layers.push(newLayer);
    this._lContView.renderLayer(newLayer);
}

LayersContainer.prototype.saveLayer = function(item) {
    const layer = this.layers.find(layer => layer.id === item.id);
    layer.title = this._lContView.getInputValue(item);
    this._lContView.setAsSaved(item);

    // -- maker server request
    // -- play animation 
    // -- on succes changeSaveIcon
    // -- on faoilure show error
}

LayersContainer.prototype.delLayer = function() {
    if (this.selectedLayer === null || this.selectedLayer === undefined) return;

    const layer = this.layers.find(layer => layer.id === this.selectedLayer.id);
    if (layer.state === "new") {
        this.layers = this.layers.filter(l => l.id !== layer.id);
        this._lContView.clearLayer(this.selectedLayer);
        this.selectedLayer = null;
        
    } else {
        console.log("server request on deleting");
    }
} 

export default LayersContainer;