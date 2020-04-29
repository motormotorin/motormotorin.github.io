var locConfig = {
    permID: 'FPOQ7'
};

var map = null;

L.Map.addInitHook(function () {
    lid = 'F2F3E51EFA1C4CFB87F5EEDBEB9201F9';
    mid = '5d4c240a69caa174d2aed035915c95cc';
    delay = 10000;
    prefix = '//maps.kosmosnimki.ru';
    url = 'get.php';

    var busMarkers = {};
    var data = {};
    map = this;
    var gmxMap = null;
    var fg = L.geoJSON([], {
        onEachFeature: (feature, layer) => {
            let props = feature.properties;
            data[props.id] = layer;
            layer.options.icon = L.icon({
                iconUrl: prefix + '/GetImage.ashx?usr=motorin%40scanex.ru&img=bus.png',
                iconSize: [35, 35],
				iconAnchor: [0, 0],
				popupAnchor: [17, -1]
            });
        }
    }).bindPopup(function (layer) {
		return JSON.stringify(layer.feature.properties['type'], null, 2);
	});
	map.setMaxBounds([[43.050952, 131.85915],[42.994509, 131.94232]]);
   		reget = () => {
		 if (fg._map) {
			//prefix + '/proxy?' + url 
			 fetch('get.php', {mode: 'cors'})
				.then((res) => res.json())
				.then((arr) => {
					arr.forEach(it => {
						let feature = {
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [it.longitude, it.latitude]
							},
							properties: it
						};
						let layer = data[it.id];
						if (layer) {
							layer.setLatLng([it.latitude, it.longitude]);
						} else if (it.type == 'shuttle') {
							fg.addData([feature]);
						}
					})
			 });
		 }
		};

    map.on('layeradd', (ev) => {
        if (!gmxMap && L.gmx._maps['maps.kosmosnimki.ru']) {
            gmxMap = L.gmx._maps['maps.kosmosnimki.ru'][mid].loaded;
            let gmxProps = gmxMap.layersByID[lid].getGmxProperties(),
                meta = gmxProps.MetaProperties,
                delay = meta.delay ? parseInt(meta.delay.Value) : 5000;

            fg.getGmxProperties = () => gmxProps;
            if (gmxProps.visible) {
                map.addLayer(fg);
            }
            reget();
            gmxMap.layersByID[lid] = fg;
            setInterval(reget, delay);
        }
    }).setMinZoom(14).setMaxZoom(18);

	map.gmxDrawing.on('add', (e) => {
		e.object._obj.on('popupopen', (ev) => {
			let cont = ev.popup._container.getElementsByClassName('leaflet-popup-content')[0];
			if (!cont.getElementsByClassName('button-cont').length) {
				let div = L.DomUtil.create('div', 'button-cont', cont),
					button = L.DomUtil.create('button', 'button-in-popup', div);
				
				L.DomEvent.on(button, 'click', () => {
					map.gmxDrawing.clear(L.marker);
					let text = cont.getElementsByClassName('leaflet-gmx-popup-textarea')[0].value;
					var date = new Date();
					var JsonData = JSON.stringify({
							Date: date,
							latlng: ev.popup._latlng,
							mess: text
					});
					if (cont.getElementsByClassName('leaflet-gmx-popup-textarea')[0].value == ''|cont.getElementsByClassName('leaflet-gmx-popup-textarea')[0].value == ' ') { 
						alert('Зачем балуетесь?')
					}
					else {
					$.ajax({
   						type: "POST",
   						url: "bot.php",
   						data: {request:JsonData},
   						success: function(res) {
     						alert("Ваше сообщение появится на карте сразу после модерации...");
   						}
					});
					}
				});
				button.innerText = 'Отправить сообщение';
			}
		});
	});

    map
		.on('locationfound', (e) => { map.gmxDrawing.add(L.marker(e.latlng)); })
		.on('locationerror', (e) => { alert(e.message); })
		.addControl(L.control.gmxIcon({
				id: 'info',
				position: 'right',
				title: 'Моя позиция'
			})
			.on('click', function (ev) {
				map.locate({setView: true, maxZoom: 18});
			})
		);

});
