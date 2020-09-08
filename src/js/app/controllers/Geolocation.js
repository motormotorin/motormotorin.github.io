import defaultIcon from '../../../media/icons/default.svg';

import Evt from '../../Util/Event';

class Geolocation {
    constructor(map) {
        this._map = map;
        this.$geolocationBtn = document.querySelector("#location-btn");
        this.enable();

        this.notifyEvent = new Evt();
    }

    enable() {
        this._map.on("locationfound", (e) => {
            if (this._map.getBounds().contains(e.bounds)) {
                this.locate(e.latlng);
            } else {
                this.throwLocationErrorNotification("Вы находитесь вне территории кампуса ДВФУ");
            }
            
        });

        this._map.on("locationerror", (e) => {
            this.throwLocationErrorNotification("Возникла ошибка при опеределении вашей геопозиции");
        });

        this.$geolocationBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.getLocation();

            document.querySelector("body").click();
        });
    }

    getLocation() {
        this._map.locate({ setView: false });
    }

    locate(latlng) {
        this._map.setView(latlng, 18);
        this.showLocationByMarker(latlng);
    }

    showLocationByMarker(latlng) {
        var marker = new L.Marker(latlng, {
            icon: new L.Icon({
                iconUrl: defaultIcon,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }),
            draggable: false
        });

        marker.addTo(this._map);
        document.addEventListener("click", () => marker.remove(), {once: true});
    }

    throwLocationErrorNotification(notificationText) {
        this.notifyEvent.notify("system-notification", notificationText);
    } 
}

export default Geolocation;