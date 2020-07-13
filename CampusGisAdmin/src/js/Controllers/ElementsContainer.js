import ElementsContainerView from '../Views/ElementsContainerView';
import { elementsContainerDOM, elementDOM, layersContainerDOM } from '../Util/Base';
import Marker from '../Models/Marker';

function ElementsContainer(data) {
    this.elements = data || [];
    this._elContView = ElementsContainerView.init();
    this.initHandlers();
}

ElementsContainer.prototype.initHandlers = function() {
    this.container = document.querySelector(`.${elementsContainerDOM.container}`);
    this.toolbar = document.querySelector(`#${elementsContainerDOM.toolbarID}`);

    this.toolbar.addEventListener("click", (e) => {
        if (e.target.closest(`#${elementsContainerDOM.acordionID}`)) {
            this._elContView.toggleContainer();

        } else if (e.target.closest(`#${elementsContainerDOM.addBtnID}`)) {
            this.addNewElement();

        } else if (e.target.closest(`#${elementsContainerDOM.delBtnID}`)) {
            this.delElement();
        }
    });

    this.container.addEventListener("click", (e) => {
        if (e.target.closest(`.${elementDOM.item}`)) {
            let item = e.target.closest(`.${elementDOM.item}`);
            this.selectElement(item);
        }
    });
}

ElementsContainer.prototype.update = function() {}

ElementsContainer.prototype.selectElement = function(item) {
    this.selectedElement = item;
    this._elContView.highlightSelectedElement(item);
}

ElementsContainer.prototype.addNewElement = function() {
    const newMarker = new Marker();
    this.elements.push(newMarker);
    this._elContView.renderElement(newMarker);
}

ElementsContainer.prototype.delElement = function() {
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