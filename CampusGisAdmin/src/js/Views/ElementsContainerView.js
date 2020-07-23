import { 
    elementsContainerDOM as elements, 
    elementDOM as row 
} from '../Util/Base';


function ElementsContainerView() {
    this.container = document.querySelector(`.${elements.container}`);
    this.toolbar = document.querySelector(`#${elements.toolbarID}`);
}

ElementsContainerView.prototype.disable = function() {
    const wrapper = `<div class="wrapper"></div>`;

    this.toolbar.insertAdjacentHTML("afterbegin", wrapper);
    this.container.insertAdjacentHTML("afterbegin", wrapper);
}

ElementsContainerView.prototype.enable = function() {
    [this.toolbar, this.container].forEach(block => {
        const child = block.querySelector('.wrapper');
        if (child) child.parentNode.removeChild(child);
    });
}

ElementsContainerView.prototype.highlightSelectedElement = function(elementId) {
    const elements = Array.from(this.container.children);
    const selectedElement = elements.find(element => element.id === elementId);

    elements.forEach(element => {
        element.classList.remove(row.itemActive);
    });
    selectedElement.classList.add(row.itemActive);
}

ElementsContainerView.prototype.isElementSelected = function(elementId) {
    return this.container.querySelector(`#${elementId}`).classList.contains(row.itemActive);
}

ElementsContainerView.prototype.getSelectedElementId = function() {
    const selectedElement = this.container.querySelector(`.${row.itemActive}`);
    return selectedElement 
        ? selectedElement.id
        : undefined;
}


ElementsContainerView.prototype.renderElement = function(element) {
    const elementHTML = `
        <div id="${element.id}" class="item-row">
            <img class="item-row__img" src="./media/file.svg">
            <input class="item-row__input"type="text" 
                placeholder="Название слоя" 
                value="${element.title}" disabled>
            <button id="edit-btn" class="item-row__btn">
                <img src="./media/edit.svg">
            </button>
        </div>
    `;

    this.container.insertAdjacentHTML("afterbegin", elementHTML);
}

ElementsContainerView.prototype.clearElement = function(element) {
    element.parentNode.removeChild(element);
}

ElementsContainerView.prototype.clearContainer = function() {
    this.container.innerHTML = "";
}

ElementsContainerView.prototype.toggleContainer = function() {
    const toolbarBtn = this.toolbar.querySelector(`.${elements.toolbarToggleBtn}`);
    
    toolbarBtn.classList.toggle(elements.acordionHide);
    this.container.classList.toggle(elements.containerHide);
}

export default ElementsContainerView;