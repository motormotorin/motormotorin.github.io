import AppView from '../Views/AppView';

import Map from './Map';
import EditingBar from '../Controllers/EditingBar';
import { headerDOM } from '../Util/Base';

function App() {
    this.activeMode = null;
    this.activeUser = null;

    this._appView = AppView;
    this._map = new Map();

    this.initHandlers();
}

App.prototype.initHandlers = function initHandlers() {
    document.querySelector(`.${headerDOM.headerUl}`).addEventListener("click", (e) => {
        e.preventDefault();     
        const data = e.target.getAttribute("data-editor");
        this.selectEditor(data);
        this._appView.highlightSelected(e.target.id);   
    });
}

App.prototype.selectEditor = function selectEditor(editorType) {
    switch(editorType) {
        case "map": 
            this.editor = new EditingBar(this._map, null);
            break;
        case "gallery": 
            break;
    }
}

export default App;