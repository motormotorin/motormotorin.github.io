export default class MapData {
    constructor() {
        if (MapData.exists) {
            return MapData.instance;
        }
        MapData.instance = this;
        MapData.exists = true;

        this.observers = [];
    }
}