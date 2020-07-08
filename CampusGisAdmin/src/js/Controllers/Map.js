function Map() {
    this._map = L.map('mapid')
    .setView([43.02825898949743, 131.89296126365664], 13)
    .setMaxBounds([[43.050952, 131.85915],[42.994509, 131.94232]]);

    this.init();
}

Map.prototype.init = function() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 15,
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(this._map);
}

export default Map;