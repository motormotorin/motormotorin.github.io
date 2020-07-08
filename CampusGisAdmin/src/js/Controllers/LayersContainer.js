import { layersContainerDOM } from '../Util/Base';
import LayersContainerView from '../Views/LayersContainerView';
import Layer from '../Models/Layer';


function LayersContainer(data) {
    this.dataArray = data;
    this.newLayer = null;
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
                this.newLayer = new Layer();
                this._lContView.addLayer(this.newLayer);
            } else {
                alert("Сохраните предыдущий слой");
            }
            
        } else if (e.target.closest(`#${layersContainerDOM.delBtnID}`)) {
            console.log("del item");
        } 
    });

    this.container.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.closest(`.${layersContainerDOM.item}`)) {
            let item = e.target.closest(`.${layersContainerDOM.item}`);
            this._lContView.highlightSelectedLayer(item);
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

LayersContainer.prototype.saveLayer = function() {
    // -- maker server request
    // -- play animation 
    // -- on succes changeSaveIcon
}

export default LayersContainer;