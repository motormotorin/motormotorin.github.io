L.Map.addInitHook(function () {
    const _map = this;
    const duration = 2000;
    const _timerId = null;
    var busesObjectsArray = []; 

    const init = async () => {
        await _buildDefaultLayer();
        _setLayersOnMap();
        _setTimer();
    }

    const _buildDefaultLayer = () => {
        _getDataFromServer()
        .then(data => JSON.parse(data))
        .then(data => {
            data.forEach(el => {
                el.marker = L.Marker.movingMarker(
                    [[el.latLng.lat, el.latLng.lng], [el.latLng.lat, el.latLng.lng]], 
                    [duration], 
                    {autostart: true});
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
        timeId = setInterval(() => {
            _updateBusPosition();
        }, 5000);
    }

    const _getDataFromServer = () => {
        // add get request 
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(JSON.stringify(busObjExmpl));
            }, 2000);
        });
    }

    const _setDataToMarker = (data) => {
        data.forEach(busObj => {
            let index = busesObjectsArray.findIndex(el => el.id == busObj.id);
            if (index !== -1) {
                busesObjectsArray[index].marker.addLatLng([busObj.latLng.lat, busObj.latLng.lng], [duration]);
            }
        });
    }

    const _setLayersOnMap = () => {
        let groupedLayers = [];
        busesObjectsArray.forEach(bus => {
            groupedLayers.push(bus.marker);
        });
        L.layerGroup(groupedLayers).addTo(_map);
    }
});