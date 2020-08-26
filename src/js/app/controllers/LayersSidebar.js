import LayersSidebarView from '../views/LayersSidebarView';
import Evt from '../../Util/Event';

function LayersSidebar() {
    this.view = new LayersSidebarView();
    // this.toggleLayerDisablingEvent = new Evt();

    this.enable();
}

LayersSidebar.prototype = {
    enable: function() {
        this.view.$layersSidebar.addEventListener("click", (e) => {  
            var layer = e.target.closest(".sidebar__checkbox");
            if (layer) {
                this.toggleLayerDisabling(layer);
            }
        });

        this.view.$layersBtn.addEventListener("click", () => {
            this.show();
        });

        return this;
    },

    show: function() {
        var wrapperHTML = this.view.createWrapperHTML();
        this.view.renderWrapper(wrapperHTML);
        this.view.show();

        document.querySelector(".wrapper").addEventListener("click", (e) => {
            this.hide();
        });
    },

    hide: function() {
        this.view.hide();
        this.view.removeWrapper();
    },

    renderLayersItems: function(layers) {
        layers.forEach(layer => {
            var layerHTML = this.view.createLayerHTML(layer);
            this.view.renderLayer(layerHTML);
        });
    },

    toggleLayerDisabling: function(layer, isDisabled) {
        layer.classList.toggle("sidebar__checkbox--disabled");
        // const state = isDisabled ? "active" : "disable";
        // this.view.toggleDisabling(layerId);
        // //this.toggleLayerDisablingEvent.notify(layerId, state);
    }

};

export default LayersSidebar;