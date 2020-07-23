import EditingBarView from '../Views/EditingBarView';

import LayersContainer from '../Controllers/LayersContainer';
import ElementsContainer from '../Controllers/ElementsContainer';
import MarkerEditingBar from './MarkerEditingBar';

import { editorBarDOM as elements } from '../Util/Base';



function EditingBar(map, mapData) {
    this.selectedType = "layers";

    this.typesToId = {
        "layers": elements.layerSelectorID,
        "buildings": elements.buildingsSelectorID
    }

    this._map = map;
    this._mapData = mapData;
    this._edBarView = new EditingBarView();

    this._layersContainer = new LayersContainer([]);
    this._elementsContainer = new ElementsContainer([]);
    this._rightBar = new MarkerEditingBar();
    
    this.initHandlers();
    this.selectType(this.selectedType);
}

EditingBar.prototype.initHandlers = function() {
    this._edBarView.editorBar.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (e.target.closest(`.${elements.selectorLi}`)) {
            const type = Object.keys(this.typesToId)
                .find(key => this.typesToId[key] === e.target.id);     
            if (type) this.selectType(type);
        } 
    });

    this._layersContainer.on("layerSelected", () => {
        console.log("layer selected");
        this._elementsContainer.enable();
    });

    this._layersContainer.on("layerAdded", () => {
        console.log("layer added");
    });

    this._layersContainer.on("layerDeleted", () => {
        console.log("layer deleted");
        this._elementsContainer.disable();
    });
}

EditingBar.prototype.selectType = function(type) {
    // const data = this._mapData.getData(type);
    // this._layersContainer.render(data);
    this.selectedType = type;
    this._edBarView.highlightSelected(this.typesToId[type]);
}

EditingBar.prototype.updateContainers = function() {
    return;
}

EditingBar.prototype.clear = function() {
    return;
}


export default EditingBar;