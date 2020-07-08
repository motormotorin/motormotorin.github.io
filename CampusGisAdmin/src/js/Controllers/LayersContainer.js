import { layersContainerDOM } from '../Util/Base';
import LayersContainerView from '../Views/LayersContainerView';

function LayersContainer(data) {
    this.dataArray = data || [];
    this._lContView = Object.create(LayersContainerView);
    this.initHandlers();
} 

LayersContainer.prototype.initHandlers = function() {
    this.container = document.querySelector(`.${layersContainerDOM.container}`);
    this.toolbar = document.querySelector(`#${layersContainerDOM.toolbarID}`);

    this.toolbar.addEventListener("click", (e) => {
        e.preventDefault();

        if (e.target.closest(`#${layersContainerDOM.acordionID}`)) {
            console.log("toggle container");
        } else if (e.target.closest(`#${layersContainerDOM.addBtnID}`)) {
            console.log("add item");
        } else if (e.target.closest(`#${layersContainerDOM.delBtnID}`)) {
            console.log("del item");
        } 
    });

    this.container.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("select item");
    });
}

export default LayersContainer;