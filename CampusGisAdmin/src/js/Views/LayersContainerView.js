import { layersContainerDOM as elements, 
         elementDOM as row } from '../Util/Base';


function LayersContainerView() {
    this.container = document.querySelector(`.${elements.container}`);
    this.toolbar = document.querySelector(`#${elements.toolbarID}`);
}

LayersContainerView.prototype.highlightSelectedLayer = function(layerId) {
    const layers = Array.from(this.container.children);
    const selectedLayer = layers.find(layer => layer.id === layerId);

    layers.forEach(layer => {
        layer.classList.remove(row.itemActive);
    });
    selectedLayer.classList.add(row.itemActive);
};

LayersContainerView.prototype.isLayerSelected = function(layerId) {
    return this.container.querySelector(`#${layerId}`).classList.contains(row.itemActive) || false;
}

LayersContainerView.prototype.getSelectedLayerId = function() {
    const selectedLayer = this.container.querySelector(`.${row.itemActive}`);
    return selectedLayer 
        ? selectedLayer.id 
        : undefined;    
}

LayersContainerView.prototype.renderLayer = function(layer) {     
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

LayersContainerView.prototype.clearLayer = function(layerId) {
    const layer = this.container.querySelector(`#${layerId}`);
    this.container.removeChild(layer);
};

LayersContainerView.prototype.clearContainer = function() {
    this.container.innerHTML = "";
};

LayersContainerView.prototype.getInputValue = function(layerId) {
    return this.container.querySelector(`#${layerId} input`).value || "";
};

LayersContainerView.prototype.setAsSaved = function(layerId) {
    const layerStateImg = this.container.querySelector(`#${layerId} #${row.itemSaveBtnID} img`);
    layerStateImg.src = "./media/saved.svg";
};

LayersContainerView.prototype.setAsUnsaved = function(layerId) {
    const layerStateImg = this.container.querySelector(`#${layerId} #${row.itemSaveBtnID} img`);
    layerStateImg.src = "./media/unsaved.svg";
};

LayersContainerView.prototype.toggleContainer = function() {
    const toggleBtn = this.toolbar.querySelector(`.${elements.toolbarToggleBtn}`);

    toggleBtn.classList.toggle(elements.acordionHide);
    this.container.classList.toggle(elements.containerHide);
};


export default LayersContainerView;