import { layersContainerDOM } from '../Util/Base';
import LayersContainerView from '../Views/LayersContainerView';
import Layer from '../Models/Layer';


function LayersContainer(data) {
    this.dataArray = data || [];
    this.selectedLayerID = null;

    this._lContView = LayersContainerView;
    this.initHandlers();
} 

LayersContainer.prototype.initHandlers = function() {
    this.container = document.querySelector(`.${layersContainerDOM.container}`);
    this.toolbar = document.querySelector(`#${layersContainerDOM.toolbarID}`);

    this.toolbar.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.closest(`#${layersContainerDOM.acordionID}`)) {
            this._lContView.toggleContainer();

        } else if (e.target.closest(`#${layersContainerDOM.addBtnID}`)) {
            if (this.newLayer === undefined || this.newLayer === null) {
                this.addNewLayer();
            } else {
                alert("Сохраните предыдущий слой");
            } 

        } else if (e.target.closest(`#${layersContainerDOM.delBtnID}`)) {
            this.delLayer();
        } 
    });

    this.container.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.closest(`.${layersContainerDOM.item}`)) {
            let item = e.target.closest(`.${layersContainerDOM.item}`);
            this.selectLayer(item);
        }
    });

    this.container.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (e.target.className === layersContainerDOM.itemInput) {
            let item = e.target.closest(`.${layersContainerDOM.item}`);
            e.target.disabled = false;
            e.target.focus();
            this._lContView.highlightSelectedLayer(item);
        }
    });

    this.container.addEventListener("change", (e) => {
        e.preventDefault();
        e.target.blur();
        e.target.disabled = true;
    });

    this.container.addEventListener("focusout", (e) => {
        e.preventDefault();    
        e.target.disabled = true;
    });
}

LayersContainer.prototype.selectLayer = function(item) {
    this.selectedLayerID = item.id;
    this._lContView.highlightSelectedLayer(item);
}

LayersContainer.prototype.addNewLayer = function() {
    let newLayer = new Layer();
    this.dataArray.push(newLayer);
    this._lContView.renderLayer(newLayer);
}

LayersContainer.prototype.saveLayer = function() {
    // -- maker server request
    // -- play animation 
    // -- on succes changeSaveIcon
}

LayersContainer.prototype.delLayer = function() {
    if (this.selectedLayerID === null || this.selectedLayerID === undefined) return;

    const layer = this.dataArray.find(layer => layer.id === this.selectedLayerID);
    if (layer.state === "new") {
        this.dataArray = this.dataArray.filter(l => l.id !== layer.id);
        this.selectedLayerID = null;
        this._lContView.clearLayer(layer.id);
        
    } else {
        console.log("server request on deleting");
    }
    // -- if layer.state === "new" delete layer 
    // -- else make server request on deleting 
    //    -- on success delete layer
    //    -- on failure show error message
} 

export default LayersContainer;