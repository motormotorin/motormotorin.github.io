var locConfig = {
	permID: 'FPOQ7'
};
var urlBot = 'https://api.telegram.org/bot904173097:AAF9hVTeaD9HAhW8kA2aAbcCc83T2XBPoPM/sendMessage?chat_id=-279678173&text=';

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
		if (!gmxMap && L.gmx._maps['maps.kosmosnimki.ru']) {
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
	map.gmxDrawing.on('add', (e) => {
		e.object._obj.on('popupopen', (ev) => {
			let cont = ev.popup._container.getElementsByClassName('leaflet-popup-content')[0];
			if (!cont.getElementsByClassName('button-cont').length) {
				let div = L.DomUtil.create('div', 'button-cont', cont),
					button = L.DomUtil.create('button', 'button-in-popup', div);
				button.innerText = 'Отправить сообщение на карту';
				L.DomEvent.on(button, 'click', () => {
// console.log('event', ev.popup);
					let text = cont.getElementsByClassName('leaflet-gmx-popup-textarea')[0].value;
					var JsonData = {
							latlng: ev.popup._latlng,
							mess: text
					};
					$.ajax({
   						type: "POST",                                     //метод запроса, POST или GET (если опустить, то по умолчанию GET)
   						url: "bot.php",                                //серверный скрипт принимающий запрос
   						data: {JsonData},//можно передать строку с параметрами запроса, ключ=значение		   
   						success: function(res) {                          //функция выполняется при удачном заверщение
     							alert("Данные успешно отправлены на сервер");
   						}
					});
					//fetch(urlBot + JSON.stringify({
						//latlng: ev.popup._latlng,
						//mess: text
					
						.then((res) => res.json())
						.then((json) => {
							console.log('telegram', json);
						});
						
				});
				button.innerText = 'Отзыв';
			}
		});
	});

	// позиция юзера
	map
		.on('locationfound', (e) => { map.gmxDrawing.add(L.marker(e.latlng)); })
		.on('locationerror', (e) => { alert(e.message); })
		.addControl(L.control.gmxIcon({
				id: 'info',
				position: 'right',
				title: 'Моя позиция'
			})
			.on('click', function (ev) {
				map.locate({setView: true, maxZoom: 16});
				// console.log('Точка', ev);
			})
		);

});
