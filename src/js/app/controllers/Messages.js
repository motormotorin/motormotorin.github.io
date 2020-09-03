import Evt from '../../Util/Event';

class Messages {
    constructor(map) {
        this.map = map;
        this._loopId;
        this.messages = {};

        this.notifyEvent = new Evt();

        this.messagesLayer = new L.GeoJSON([], {
            onEachFeature: function(feature, layer) {
                let props = feature.properties;
                this.messages[props.id] = layer;

                layer.options.icon = new L.Icon({
                    iconUrl: 'https://fefumap.ru/media/main/blue-pin-msg.svg',
                    iconSize: [18.5, 12.5],
                    iconAnchor: [9.25, 6.25]
                });

                var mess = JSON.stringify(layer.feature.properties["mess"], null, 2)
                    .replace(/\\"/g, "'")
                    .replace(/\\n/g, '<br>')
                    .replace(/\"/g, '');

                layer.on("click", this.showMessage.bind(this, mess));
            }

        });

        this.messagesLayer.addTo(this.map);

        this.enableLoop();
    }

    enableLoop() {
        this.getMessages();
        this._loopId = setInterval(this.getMessages.bind(this), 30000);
    }

    disableLoop() {
        clearInterval(this._loopId);
    }

    addMessage(feature, message) {
        if (feature.geometry.coordinates.length === 2) {
            let layer = this.messages[message.id];
            let messageLiveTime = (new Date() - new Date(message.Date)) / 3600000;

            if (messageLiveTime >= 12)  {
                if (layer) layer.remove([message.id]);

            } else if (messageLiveTime < 12) {
                this.messages[message.id] = 
                this.messagesLayer.addData([feature]);
            }
        }
    }

    getMessages() {
        fetch("https://fefumap.ru/getmess.php")
        .then(res => JSON.parse(res))
        .then(arr => {
            arr.forEach(message => {
                let feature = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            message.latlng["lng"], 
                            message.latlng["lat"]
                        ],
                        properties: message
                    }
                }
                this.addMessage(feature, message);
            });
        });
    }

    showMessage(message) {
        this.notifyEvent.notify(message);
    }

}

export default Messages;