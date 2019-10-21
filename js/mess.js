L.Map.addInitHook(function () {
	var map = this,
		data = {},
		gmxMap = null,
		lid = '9D36AA7EAD0244F5BFBCF7D55453FED6',
		mid = '5d4c240a69caa174d2aed035915c95cc',
		delay = 6000,
		mess = L.geoJSON([], {
			onEachFeature: function (feature, layer) {
				let props = feature.properties;
				data[props.id] = layer;
				layer.options.icon = L.icon({
					iconUrl: prefix + '/GetImage.ashx?usr=motorin%40scanex.ru&img=15325783401553666166-128.png',
					iconSize: [50, 50],
					iconAnchor: [15, 15],
					popupAnchor: [0, -7]
				});
			}
		}).bindPopup(function (layer) {
			return JSON.stringify(layer.feature.properties, null, 2);
		}),
		reget = () => {
		 if (mess._map) {
			 fetch('https://fefumap.ru/mess.txt')
				.then((res) => res.json())
			 	console.log(res);
				.then((arr) => {
					arr.forEach(it => {
						let feature = {
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [it.lng, it.lat]
							},
							properties: it
						};
						let layer = data[it.id];
						if (layer) {
							layer.setLatLng([it.lat, it.lng]);
						} else {
							mess.addData([feature]);
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
			// console.log('dddf', fg);
			gmxMap.layersByID[lid] = mess;
			setInterval(reget, delay);

			reget();
		}
	});
});
