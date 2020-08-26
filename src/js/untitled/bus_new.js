

L.Map.addInitHook(function () {
    const _map = this;
    const duration = duration;
    const _timerId = null;

    var busesObjectsArray = []; 

    // const busObj = [
    //     {
    //         id: "0123012",
    //         curLatLng: {
    //             lat: 
    //             lng: 
    //         },
    //         prevLatLng: {
    //             lat: 
    //             lng:
    //         }
    //     }
    // ];

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
                    [[el.prevLatLng.lat, el.prevLatLng.lng], [el.curLatLng.lat, el.curLatLng.lng]], 
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
        const url = "";
        return fetch(url);
    }

    const _setDataToMarker = (data) => {
        data.forEach(busObj => {
            let ind = busesObjectsArray.findIndex(el => el.id == busObj.id);
            if (ind !== -1) {
                busesObjectsArray[ind].marker.moveTo([busObj.curLatLng.lat, busObj.curLatLng.lng], [duration]); 
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
    init();
});