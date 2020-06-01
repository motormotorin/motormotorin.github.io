var overlay = null;

setTimeout(() => {
// var topLeft = BuildingA.coords.topLeft,
//     topRight = BuildingA.coords.topRight,
//     bottomLeft = BuildingA.coords.bottomLeft;

var point1 = L.latLng(43.02507858514359, 131.8935137987137),
    point2 = L.latLng(43.02479622315571, 131.89463496208194),
    point3 = L.latLng(43.02421869798665, 131.8931120321577);

var marker1 = L.marker(point1, {draggable: true} ).addTo(map),
    marker2 = L.marker(point2, {draggable: true} ).addTo(map),
    marker3 = L.marker(point3, {draggable: true} ).addTo(map);
    

var	bounds = new L.LatLngBounds(point1, point2).extend(point3);

map.fitBounds(bounds);

overlay = L.imageOverlay.rotated("./Plans/BuildingA/Level-6.svg", point1, point2, point3, {
    opacity: 0.4,
    interactive: true,
});

function repositionImage() {
    overlay.reposition(marker1.getLatLng(), marker2.getLatLng(), marker3.getLatLng());
};

marker1.on('drag dragend', repositionImage);
marker2.on('drag dragend', repositionImage);
marker3.on('drag dragend', repositionImage);

// 		var c = overlay.getCanvas2DContext()

map.addLayer(overlay);

overlay.on('dblclick',function (e) {
    console.log('Double click on image.');
    e.stop();
});

overlay.on('click',function (e) {
    console.log('Click on image.');
});

function setOverlayOpacity(opacity) {
    overlay.setOpacity(opacity);
}
}, 1000);