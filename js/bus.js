var locConfig = {
	permID: '6USFA'
};


L.Map.addInitHook(function () {
	// L.gmx.DummyLayer.prototype._layerAdd = () => {};
	var map = this,
		data = {},
		gmxMap = null,
		lid = 'B750DB8488714446A1C0F2246B8FA630',
		mid = '5d4c240a69caa174d2aed035915c95cc',
		delay = 1000,
		prefix = '//maps.kosmosnimki.ru',
		url = 'http://dvfu.dewish.ru/map/api',
		fg = L.geoJSON([], {
			onEachFeature: function (feature, layer) {
				let props = feature.properties;
				data[props.id] = layer;
				layer.options.icon = L.icon({
					iconUrl: prefix + '/GetImage.ashx?usr=motorin%40scanex.ru&img=school-bus.png',
					iconSize: [50, 50],
					iconAnchor: [15, 15],
					popupAnchor: [0, -7]
				});
			}
		}).bindPopup(function (layer) {
			return JSON.stringify(layer.feature.properties, null, 2);
		}),
		reget = () => {
		 if (fg._map) {
			 fetch(prefix + '/proxy?' + url, {mode: 'cors'})
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
						} else {
							fg.addData([feature]);
						}
						
					})
			 });
		 }
		};

	
	map.on('layeradd', (ev) => {
		if (!gmxMap) {
			gmxMap = L.gmx._maps['maps.kosmosnimki.ru'][mid].loaded;
			let gmxProps = gmxMap.layersByID[lid].getGmxProperties(),
				meta = gmxProps.MetaProperties,
				delay = meta.delay ? parseInt(meta.delay.Value) : 5000;

			fg.getGmxProperties = () => gmxProps;
			if (gmxProps.visible) {
				map.addLayer(fg);
			}
			// console.log('dddf', fg);
			gmxMap.layersByID[lid] = fg;
			setInterval(reget, delay);

			reget();
		}
	});
});
