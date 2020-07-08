import { layersContainerDOM } from '../Util/Base';



const LayersContainerView = {
    highlightSelectedLayer: function() {},

    addLayer: function(layer) {     
        const layerHTML = `
            <div id="${layer.id}" class="item-row">
                <span class="item-row__img">
                    <img src="./media/file.svg">
                </span>
                <span>
                    <input class="item-row__input"type="text" placeholder="Название слоя" value="${layer.title}">
                </span>
                <button id="save" class="item-row__btn">
                    <img src="./media/${layer.state === "new" ? "unsaved" : "saved"}.svg">
                </button>
            </div>
        `;

        document.querySelector(`.${layersContainerDOM.container}`).insertAdjacentHTML("afterbegin", layerHTML);
    },

    deleteLayer: function() {},
    renderLayers: function() {},

    toggleContainer: function() {
        const toolbarToggler = document.querySelector(`#${layersContainerDOM.toolbarID} #${layersContainerDOM.acordionID}`);
        const layersContainer = document.querySelector(`.${layersContainerDOM.container}`);

        toolbarToggler.classList.toggle(layersContainerDOM.acordionHide);
        layersContainer.classList.toggle(layersContainerDOM.containerHide);
    }
}

export default LayersContainerView;