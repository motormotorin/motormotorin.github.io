import PlaceEditingPanel from './PlaceEditingPanel';
import AsideView from '../views/AsideView';

function Aside(images) {
    this._currentPanel;

    this.view = new AsideView();
    this.placeEditingPanel = new PlaceEditingPanel(images);

    this.view.hide();
    // this.placeEditingPanel.show();
}

Aside.prototype = {
    selectPanel: function(type, layerId, place) {
        switch(type) {
            case 'place': 
                this._currentPanel = this.placeEditingPanel;
                this.placeEditingPanel.setPlace(layerId, place);
                break;
            case 'building': console.log("building selected"); break;
        }

        this.view.show();
    },

    unselectPanel: function() {
        this._currentPanel.close();
        this._currentPanel = undefined;
        this.view.hide();
    }
}


export default Aside;