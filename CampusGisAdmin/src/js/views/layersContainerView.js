import { elements } from './base';

export const clearContainer = () => {
    elements.layersContainer.innerHTML = "";
}

export const renderLayer = (layer) => {
    const layerRowHTML = `
        <div id="${layer.id}"class="row layer-row">
            <span class="layer-title-group">
                <span>
                    <img src="./media/file.svg">
                </span>
                <span>
                    <input class="layer-name" value="${layer.name}" disabled type="text" placeholder="Название слоя">
                </span>
            </span>
            <button id="save">
                <img src="./media/save.svg">
            </button>
        </div>
    `;

    elements.layersContainer.insertAdjacentHTML('afterbegin', layerRowHTML);
}

export const deleteLayer = (id) => {
    const row = elements.layersContainer.querySelector(`#${id}`);
    row ? row.parentNode.removeChild(row) : null;
}

export const highlightSelectedLayer = (id) => {
    const layersRows = elements.layersContainer.querySelectorAll('.layer-row');
    Array.from(layersRows).forEach(el => {
        el.classList.remove('active');
    });
    elements.layersContainer.querySelector(`.layer-row[id="${id}"]`).classList.add('active');
}