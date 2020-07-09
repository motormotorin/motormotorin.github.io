import { layersContainerDOM } from '../Util/Base';
import Layer from '../Models/Layer';



const LayersContainerView = {};

LayersContainerView.init = function() {
    this.container = document.querySelector(`.${layersContainerDOM.container}`);
    return this;
}

LayersContainerView.highlightSelectedLayer = function(layer) {
    Array.from(this.container.children).forEach(chld => {
        chld.classList.remove(layersContainerDOM.itemActive);
    });
    layer.classList.add(layersContainerDOM.itemActive);
};

LayersContainerView.renderLayer = function(layer) {     
    const layerHTML = `
        <div id="${layer.id}" class="item-row">
            <span class="item-row__img">
                <img src="./media/file.svg">
            </span>
            <span>
                <input class="item-row__input"type="text" 
                    placeholder="Название слоя" 
                    value="${layer.title}" disabled>
            </span>
            <button id="save-btn" class="item-row__btn">
                <img src="./media/${layer.state === "new" ? "unsaved" : "saved"}.svg">
            </button>
        </div>
    `;

    this.container.insertAdjacentHTML("afterbegin", layerHTML);
};

LayersContainerView.clearLayer = function(item) {
    item.parentNode.removeChild(item);
}

LayersContainerView.clearAll = function() {
    this.container.innerHTML = "";
}

LayersContainerView.getInputValue = function(item) {
    return item.querySelector('input').value || "";
}

LayersContainerView.setAsSaved = function(item) {
    const img = item.querySelector(`#${layersContainerDOM.itemSaveBtnID} img`);
    img.src = "./media/saved.svg";
};

LayersContainerView.setAsUnsaved = function(item) {
    const img = item.querySelector(`#${layersContainerDOM.itemSaveBtnID} img`);
    img.src = "./media/unsaved.svg";
};

LayersContainerView.toggleContainer = function() {
    const toolbarToggler = document.querySelector(`#${layersContainerDOM.toolbarID} #${layersContainerDOM.acordionID}`);

    toolbarToggler.classList.toggle(layersContainerDOM.acordionHide);
    this.container.classList.toggle(layersContainerDOM.containerHide);
};


export default LayersContainerView;