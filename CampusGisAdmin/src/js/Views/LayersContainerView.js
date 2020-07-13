import { layersContainerDOM, elementDOM } from '../Util/Base';
import Layer from '../Models/Layer';



const LayersContainerView = {};

LayersContainerView.init = function() {
    this.container = document.querySelector(`.${layersContainerDOM.container}`);
    return this;
};

LayersContainerView.highlightSelectedLayer = function(layer) {
    Array.from(this.container.children).forEach(chld => {
        chld.classList.remove(elementDOM.itemActive);
    });
    layer.classList.add(elementDOM.itemActive);
};

LayersContainerView.renderLayer = function(layer) {     
    const layerHTML = `
        <div id="${layer.id}" class="item-row">
            <img class="item-row__img" src="./media/file.svg">
            <input class="item-row__input"type="text" 
                placeholder="Название слоя" 
                value="${layer.title}" disabled>
            <button id="save-btn" class="item-row__btn">
                <img src="./media/${layer.state === "new" ? "unsaved" : "saved"}.svg">
            </button>
        </div>
    `;

    this.container.insertAdjacentHTML("afterbegin", layerHTML);
};

LayersContainerView.clearLayer = function(item) {
    item.parentNode.removeChild(item);
};

LayersContainerView.clearAll = function() {
    this.container.innerHTML = "";
};

LayersContainerView.getInputValue = function(item) {
    return item.querySelector('input').value || "";
};

LayersContainerView.setAsSaved = function(item) {
    const img = item.querySelector(`#${elementDOM.itemSaveBtnID} img`);
    img.src = "./media/saved.svg";
};

LayersContainerView.setAsUnsaved = function(item) {
    const img = item.querySelector(`#${elementDOM.itemSaveBtnID} img`);
    img.src = "./media/unsaved.svg";
};

LayersContainerView.toggleContainer = function() {
    const toolbarToggler = document.querySelector(`#${layersContainerDOM.toolbarID} #${layersContainerDOM.acordionID}`);

    toolbarToggler.classList.toggle(layersContainerDOM.acordionHide);
    this.container.classList.toggle(layersContainerDOM.containerHide);
};


export default LayersContainerView;