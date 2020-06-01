L.Map.addInitHook(function () {
    const _map = this;
    const duration = duration;
    var _timerId = null;
    var busesObjectsArray = []; 

    const init = async () => {
        await _buildDefaultLayer();
        await _setLayersOnMap();
        _setTimer();
    }

    const _buildDefaultLayer = async () => {
        await _getDataFromServer()
        .then(data => JSON.parse(data))
        .then(data => {
            data.forEach(el => {
                console.log(el);
                el.marker = L.Marker.movingMarker(
                    [ [el.latLng.lat, el.latLng.lng], [el.latLng.lat, el.latLng.lng] ], 
                    [duration], {autostart: true});
                busesObjectsArray.push(el);
            });
        });
    }

    const _updateBusPosition = () => {
        _getDataFromServer()
        .then(data => JSON.parse(data)) 
        .then(data => {
            _setDataToMarker(data);
        });
    }

    const _setTimer = () => {
        _timerId = setInterval(() => {
            _updateBusPosition();
        }, duration);
    }

    const _getDataFromServer = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.stringify(data));
            }, duration);
        });
    }

    const _setDataToMarker = (data) => {
        data.forEach(busObj => {
            let ind = busesObjectsArray.findIndex(el => el.id == busObj.id);

            if (ind !== -1) {
                busesObjectsArray[ind].marker.moveTo([busObj.latLng.lat, busObj.latLng.lng], [duration]); 
            }
        });
    }

    const _setLayersOnMap = (buses) => {
        var groupedLayers = [];
        busesObjectsArray.forEach(bus => {
            groupedLayers.push(bus.marker);
        });
        L.layerGroup(groupedLayers).addTo(_map);
    }
});