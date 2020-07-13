import ElementsContainerView from '../Views/ElementsContainerView';

function ElementsContainer(data) {
    this.elements = data || [];
    this.selectedElement = null;
    
    this._elContView = ElementsContainerView.init();
    this.initHandlers();
}

ElementsContainer.prototype.initHandlers = function() {}

ElementsContainer.prototype.update = function() {}

ElementsContainer.prototype.selectElement = function() {}

ElementsContainer.prototype.addNewElement = function() {}

ElementsContainer.prototype.delElement = function() {}

export default ElementsContainer;