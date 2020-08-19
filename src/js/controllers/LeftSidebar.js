import LeftSidebarView from '../views/LeftSidebarView';
import Evt from '../Util/Event';

function LeftSidebar() {
    this._state = "close";

    this.view = new LeftSidebarView();
    this.toggleLayerDisablingEvent = new Evt();

    this.enable();
}

LeftSidebar.prototype = {
    enable: function() {
        this.view.$layersSidebar.addEventListener("click", (e) => {
            const layer = e.target.closest(".layer-checkbox");
            if (layer) {
                const layerBtn = layer.querySelector(".layer-checkbox__btn");
                this.toggleLayerDisabling(layer.id, layerBtn.classList.contains("layer-checkbox__btn--disabled"));
            }
        });
    },

    open: function() {
        this._state = "open";
        this.view.open();
        this.view.addWrapper();

        document.querySelector(".wrapper").addEventListener("click", (e) => {
            this.close();
        });
    },

    close: function() {
        if (this._state === "open") {
            this._state = "close";
            this.view.close();
            this.view.removeWrapper();    
        }
    },

    renderLayersItems: function(layers) {
        if (!(layers instanceof Array)) layers = Object.values(layers);
        layers.forEach(layer => this.view.renderLayerItem(layer));
    },

    toggleLayerDisabling: function(layerId, isDisabled) {
        const state = isDisabled ? "active" : "disable";
        this.view.toggleDisabling(layerId);
        this.toggleLayerDisablingEvent.notify(layerId, state);
    }

};

export default LeftSidebar;