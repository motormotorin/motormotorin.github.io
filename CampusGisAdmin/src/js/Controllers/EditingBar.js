import EditingBarView from '../Views/EditingBarView';
import LayersContainer from '../Controllers/LayersContainer';
import { editorBarDOM } from '../Util/Base';

function EditingBar(map, data) {
    this.selectedType = "layers";

    this.typesToId = {
        "layers": editorBarDOM.layerSelectorID,
        "buildings": editorBarDOM.buildingsSelectorID
    }

    this._map = map;
    this._data = data || [];
    this._edBarView = EditingBarView;

    this._layersContainer = new LayersContainer();
    this._elementsContainer = undefined;
    
    this._edBarView.show();
    this.initHandlers();
    this.selectType(this.selectedType);
}

EditingBar.prototype.initHandlers = function() {
    this._edBarView.editorBar.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (e.target.closest(`.${editorBarDOM.selectorLi}`)) {
            const type = Object.keys(this.typesToId).find(key => this.typesToId[key] === e.target.id);
            type ? this.selectType(type) : void 0;
        } 
    });
}

EditingBar.prototype.selectType = function(type) {
    // -- const arrayOfType = this._data.getObjectArrayByType(type)
    // -- this.layersContainer.render(arrayOfType);
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