L.Map.addInitHook(function () {
	var map = this;
	var data = {};
	var gmxMap = null;
	const lid = '9D36AA7EAD0244F5BFBCF7D55453FED6';
	const mid = '5d4c240a69caa174d2aed035915c95cc';
	const kosmosnimki = 'maps.kosmosnimki.ru';

	
	var mess = L.geoJSON([], {
		onEachFeature: function (feature, layer) {
			let props = feature.properties;
			data[props.id] = layer;
			layer.options.icon = L.icon({
				iconUrl: './media/icons/blue-pin-msg-min.svg',
				iconSize: [25, 25],
				shadowSize:   [27, 27],
				iconAnchor: [15, 15],
				popupAnchor: [-4, -20]
			});

			var timeOfAdd = Math.floor((new Date() -  new Date(layer.feature.properties["Date"])) / 3600000);
			if (timeOfAdd == 0) {
				timeOfAdd = 'только что';
			} else if (timeOfAdd == 1) {
				timeOfAdd = 'час назад';
			} else if (timeOfAdd > 1 && timeOfAdd < 5 ) {
				timeOfAdd += ' часа назад';
			} else if (timeOfAdd >= 5) {
				timeOfAdd += ' часов назад';
			}

			const obj = {
				mess: JSON.stringify(layer.feature.properties["mess"], null, 2).replace(/\\"/g, "'")
																			   .replace(/\\n/g, '<br>')
																			   .replace(/\"/g, ''),
				date: timeOfAdd
			}
			const clickHandl = openMessage.bind(obj);
			layer.on({
				click: clickHandl
			});
		}	
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

					if (feature.geometry.coordinates[0] && feature.geometry.coordinates[1]) {
						let layer = data[it.id];
						let messLiveTime = (new Date() - new Date(it.Date)) / 3600000;
						if (layer) {
							if (messLiveTime > 12) {
								layer.remove([it.id])
							} else {
								layer.setLatLng([it.latlng["lat"],it.latlng["lng"]]);
							}
						} else {
							if (messLiveTime < 12) {
								mess.addData([feature]);
							}
						}
					} 
				})
			});
		}
	};

	map.on('layeradd', (ev) => {
		if (!gmxMap && L.gmx._maps[kosmosnimki]) {
			gmxMap = L.gmx._maps[kosmosnimki][mid].loaded;
			let gmxProps = gmxMap.layersByID[lid].getGmxProperties();
			let meta = gmxProps.MetaProperties;
			let delay = meta.delay ? parseInt(meta.delay.Value) : 5000;
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
