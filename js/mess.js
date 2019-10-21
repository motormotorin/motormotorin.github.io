L.Map.addInitHook(function () {
	var map = this,
		data = {},
		gmxMap = null,
		lid = '9D36AA7EAD0244F5BFBCF7D55453FED6',
		mid = '5d4c240a69caa174d2aed035915c95cc',
		delay = 60000,
		url = 'http://dvfu.dewish.ru/map/api',
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
			 fetch(https://fefumap.ru/mess.txt)
				.then((res) => res.json())
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
					var date = new Date();
					var JsonData = JSON.stringify({
							Date: date,
							latlng: ev.popup._latlng,
							mess: text
					});
					$.ajax({
   						type: "POST",                                     //метод запроса, POST или GET (если опустить, то по умолчанию GET)
   						url: "bot.php",                                //серверный скрипт принимающий запрос
   						data: {request:JsonData},				//можно передать строку с параметрами запроса, ключ=значение		   
   						success: function(res) {                          //функция выполняется при удачном заверщение
     							alert("Ваше сообщение появится на карте сразу после модерации...");
   						}
					});
					//fetch(urlBot + JSON.stringify({
						//latlng: ev.popup._latlng,
						//mess: text
					
						
						
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
