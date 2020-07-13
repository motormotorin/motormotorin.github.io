import { elementsContainerDOM, elementDOM } from '../Util/Base';


const ElementsContainerView = {};

ElementsContainerView.init = function() {
    this.container = document.querySelector(`.${elementsContainerDOM.container}`);
    return this;
}

ElementsContainerView.highlightSelectedElement = function(element) {
    Array.from(this.container.children).forEach(chld => {
        chld.classList.remove(elementDOM.itemActive);
    });
    element.classList.add(elementDOM.itemActive);
}

ElementsContainerView.renderElement = function(element) {
    const elementHTML = `
        <div id="${element.id}" class="item-row item-row--flex-start">
            <img class="item-row__img" src="./media/file.svg">
            <input class="item-row__input item-row__input--margin-left" type="text" 
                placeholder="Элемент" 
                value="" disabled>
        </div>
    `;

    this.container.insertAdjacentHTML("afterbegin", elementHTML);
}

ElementsContainerView.clearElement = function(element) {
    element.parentNode.removeChild(element);
}

ElementsContainerView.clearAll = function() {
    this.container.innerHTML = "";
}

ElementsContainerView.toggleContainer = function() {
    const toolbarToggler = document.querySelector(`#${elementsContainerDOM.acordionID}`);

    toolbarToggler.classList.toggle(elementsContainerDOM.acordionHide);
    this.container.classList.toggle(elementsContainerDOM.containerHide);
}

export default ElementsContainerView;