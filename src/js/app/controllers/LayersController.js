import Evt from '../../Util/Event';
import LayersControllerView from '../views/LayersControllerView';


class LayersController {
    constructor(layersList) {
        this.layers = localStorage.getItem("layers") || {};

        this.view = new LayersControllerView();
        this.selectLayerEvent = new Evt();

        this.enable();
    }

    enable() {
        this.view.$layerBtn.addEventListener("click", (e) => {
            var wrapper = this.view.setWrapper();
            wrapper.addEventListener("click", (e) => {
                this.view.removeWrapper();
                this.view.hidePanel();
            }, {once: true});

            this.view.showPanel();
        });

        this.view.$layersPanel.addEventListener("click", (e) => {
            if (e.target.id) {
                this.selectLayer(e.target);
            }
        });

    }

    addLayer(layer) {
        this.view.addLayer(layer);
    }

    selectLayer(target) {
        var state = target.classList.contains("sidebar__checkbox--disabled") ? "active" : "disable";
        
        this.view.toggleLayerVisibility(target.id);
        this.selectLayerEvent.notify({id: target.id, state: state});
    }

}

export default LayersController;