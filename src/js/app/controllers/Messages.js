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
                    iconUrl: './media/main/blue-pin-msg.svg',
                    iconSize: [18.5, 12.5],
                    iconAnchor: [9.25, 6.25]
                });

                var mess = JSON.stringify(layer.feature.properties["mess"], null, 2)
                    .replace(/\\"/g, "'").replace(/\\n/g, '<br>').replace(/\"/g, '');

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
                this.messagesLayer.addData([feature]);
            }
        }
    }

    async getMessages() {
        try {
            const response = await fetch("php/getmess.php");
            const array = await response.json();

            array.forEach(message => {
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

        } catch(e) {
            console.error(`[messages]: ${e}`);
        }
    }

    showMessage(message) {
        this.notifyEvent.notify(message);
    }

}

export default Messages;