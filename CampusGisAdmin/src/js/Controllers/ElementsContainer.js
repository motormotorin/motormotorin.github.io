import { 
    elementsContainerDOM as elements, 
    elementDOM as row
} from '../Util/Base';

import ElementsContainerView from '../Views/ElementsContainerView';

import Marker from '../Models/Marker';
import Event from '../Util/Event';


function ElementsContainer(data) {
    this.elements = data || [];
    this._elContView = new ElementsContainerView();

    this.initHandlers();
    this.disable();
}

ElementsContainer.prototype = Object.create(Event.prototype);

ElementsContainer.prototype.initHandlers = function() {

    // toolbar events: toggle btn; add element; delete element;
    this._elContView.toolbar.addEventListener("click", (e) => {
        if (e.target.closest(`.${elements.toolbarToggleBtn}`)) {
            this._elContView.toggleContainer();

        } else if (e.target.closest(`#${elements.addBtnID}`)) {
            this.addNewElement();

        } else if (e.target.closest(`#${elements.delBtnID}`)) {
            this.deleteElement();
        }
    });

    // container events: select element; edit element;
    this._elContView.container.addEventListener("click", (e) => {
        if (e.target.closest(`#${row.itemEditBtnID}`)) {
            console.log("edit marker");

        } else if (e.target.closest(`.${row.item}`)) {
            let elementId = e.target.closest(`.${row.item}`).id;
            this.selectElement(elementId);
        }

        // add listener of edit button click
    });
}

ElementsContainer.prototype.update = function() {}

ElementsContainer.prototype.disable = function() {
    this._elContView.disable();
}

ElementsContainer.prototype.enable = function() {
    this._elContView.enable();
}

ElementsContainer.prototype.selectElement = function(elementId) {
    this._elContView.highlightSelectedElement(elementId);

    // notify that element has been selected
}

ElementsContainer.prototype.addNewElement = function() {

    if (this.elements.filter(element => element.state === "new").length >= 1) return;
    const newMarker = new Marker();

    this.elements.push(newMarker);
    this._elContView.renderElement(newMarker);

    // notify than element has been added
}

ElementsContainer.prototype.deleteElement = function() {
    if (this.selectedElement == null && this.selectedElement == undefined) return;

    const element = this.elements.find(element => element.id === this.selectedElement.id);
    if (element.state === "new") {
        this.elements = this.elements.filter(el => el.id === element.id);
        this._elContView.clearElement(this.selectedElement);
        this.selectedElement = null;
    } else {
        console.log("server request on deleting");
    }

}

export default ElementsContainer;