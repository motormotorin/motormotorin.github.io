L.Map.addInitHook(function () {
	var map = this;
	var data = {};
	var gmxMap = null;
	const lid = '9D36AA7EAD0244F5BFBCF7D55453FED6';
	const mid = '5d4c240a69caa174d2aed035915c95cc';
	const delay = 6000;
	const prefix = '//maps.kosmosnimki.ru';

	var mess = L.geoJSON([], {
		onEachFeature: function (feature, layer) {
			let props = feature.properties;
			data[props.id] = layer;
			layer.options.icon = L.icon({
				iconUrl: prefix + '/GetImage.ashx?usr=motorin%40scanex.ru&img=MESSAGE.png',
				iconSize: [25, 25],
				shadowSize:   [27, 27],
				iconAnchor: [15, 15],
				popupAnchor: [-4, -20]
			});
		}
	}).bindPopup(function (layer) {
		var timeOfAdd = Math.floor((new Date() -  new Date(layer.feature.properties["Date"])) / 3600000);
		var pri = timeOfAdd.toString();

		if (timeOfAdd == 0) {
			pri.concat('только что');
		} else if (timeOfAdd == 1) {
			pri.concat('час назад');
		} else if (timeOfAdd > 1 & timeOfAdd < 5 ) {
			pri.concat(' часа назад');
		} else if (timeOfAdd >= 5) {
			pri.concat(' часов назад');
		}

		var textInPopup = JSON.stringify(layer.feature.properties["mess"], null, 2).replace(/\\"/g, "'")
																				   .replace(/\\n/g, '<br>')
																				   .replace(/\"/g, '');

		return '<b><p align="justify">' +  textInPopup  + '</b></p>'  + '<br>Сообщение оставленно ' + pri;
	});

	var reget = () => {
		if (mess._map) {
			fetch('getmess.php')
			.then((res) => res.json())
			.then((arr) => {
				arr.forEach(it => {
					let feature = {
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [it.latlng["lng"],it.latlng["lat"]]
						},
						properties: it
					};
					let layer = data[it.id];
					if (layer) {
						if (((new Date() - new Date(it.Date)) / 3600000) > 12) {
							layer.remove([it.id])
						}
						else {
							layer.setLatLng([it.latlng["lat"],it.latlng["lng"]]);
						}
					} else {
						if (((new Date() - new Date(it.Date)) / 3600000) < 12) {
						mess.addData([feature]);
						}
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

			mess.getGmxProperties = () => gmxProps;
			if (gmxProps.visible) {
				map.addLayer(mess);
			}
	
			gmxMap.layersByID[lid] = mess;
			setInterval(reget, delay);
			reget();
		}
	});
});
