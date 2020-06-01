import { layerStatus } from '../views/base';

export default class Layer {
    constructor() {
        this.status = layerStatus.new;
        this.name = "";
        this.id = "id" + (new Date().getTime()).toString();
        this.markers = [];
    }

    addMarker(marker) {
        this.markers.push(marker);
    }

    deleteMarker(markerId) {
        const index = this.markers.findIndex(el => el.id == markerId);
        this.markers = this.markers.splice(index, 1);
    }

    saveLayer() {
        this.status = layerStatus.old;
        console.log("saved");
    }
}