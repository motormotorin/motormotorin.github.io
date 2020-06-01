import { elements } from './base';

export const clearContainer = () => {
    elements.structureContainer.innerHTML = "";
}

export const renderElement = (element) => {
    const elementRowHtml = `
        <div id="${element.id}"class="row struct-row">
            <span class="layer-title-group">
                <span>
                    <img src="./media/file.svg">
                </span>
                <span>
                    <input class="layer-name" value="${element.name}" disabled type="text" placeholder="Название маркера">
                </span>
            </span>
            <button id="edit">
                <img src="./media/edit.svg">
            </button>
        </div>
    `;

    elements.structureContainer.insertAdjacentHTML('afterbegin', elementRowHtml);
}

export const highlightSelectedStructElem = (id) => {
    const structRows = elements.structureContainer.querySelectorAll('.struct-row');
    Array.from(structRows).forEach(el => {
        el.classList.remove('active');
    });
    elements.structureContainer.querySelector(`.struct-row[id="${id}"]`).classList.add('active');
}

export const insertNewName = (name) => {
    const row = elements.structureContainer.querySelector(".active");
    row ? row.querySelector('input').value = name : null;
}

export const deleteElement = (id) => {
    const row = elements.structureContainer.querySelector(`#${id}`);
    row ? row.parentNode.removeChild(row) : null;
}