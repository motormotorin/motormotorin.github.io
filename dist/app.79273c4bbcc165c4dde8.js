!function(e){var t={};function i(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(s,a,function(t){return e[t]}.bind(null,a));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,i){},function(e,t,i){"use strict";i.r(t);i(0);L.ImageOverlay.Rotated=L.ImageOverlay.extend({initialize:function(e,t,i,s,a,r){this._map=e,"string"==typeof t?this._url=t:this._rawImage=t,this._topLeft=L.latLng(i),this._topRight=L.latLng(s),this._bottomLeft=L.latLng(a),L.setOptions(this,r)},onAdd:function(e){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(L.DomUtil.addClass(this._rawImage,"leaflet-interactive"),this.addInteractiveTarget(this._rawImage)),e.on("zoomend resetview",this._reset,this),this.getPane().appendChild(this._image),this._reset()},onRemove:function(e){e.off("zoomend resetview",this._reset,this),L.ImageOverlay.prototype.onRemove.call(this,e)},_initImage:function(){var e=this._rawImage;this._url&&((e=L.DomUtil.create("img")).style.display="none",this.options.crossOrigin&&(e.crossOrigin=""),e.src=this._url,this._rawImage=e),L.DomUtil.addClass(e,"leaflet-image-layer");var t=this._image=L.DomUtil.create("div","leaflet-image-layer "+(this._zoomAnimated?"leaflet-zoom-animated":""));t.appendChild(e),t.onselectstart=L.Util.falseFn,t.onmousemove=L.Util.falseFn,e.onload=function(){this._reset(),e.style.display="block",this.fire("load")}.bind(this),e.alt=this.options.alt},_reset:function(){var e=this._image;if(this._map){var t=this._map.latLngToLayerPoint(this._topLeft),i=this._map.latLngToLayerPoint(this._topRight),s=this._map.latLngToLayerPoint(this._bottomLeft),a=i.subtract(t).add(s),r=L.bounds([t,i,s,a]),n=r.getSize(),o=t.subtract(r.min);this._bounds=L.latLngBounds(this._map.layerPointToLatLng(r.min),this._map.layerPointToLatLng(r.max)),L.DomUtil.setPosition(e,r.min),e.style.width=n.x+"px",e.style.height=n.y+"px";var l=this._rawImage.width,c=this._rawImage.height;if(l&&c){var d=i.subtract(t),h=s.subtract(t);this._rawImage.style.transformOrigin="0 0",this._rawImage.style.transform="matrix("+d.x/l+", "+d.y/l+", "+h.x/c+", "+h.y/c+", "+o.x+", "+o.y+")"}}},reposition:function(e,t,i){this._topLeft=L.latLng(e),this._topRight=L.latLng(t),this._bottomLeft=L.latLng(i),this._reset()},setUrl:function(e){return this._url=e,this._rawImage&&(this._rawImage.src=e),this}}),L.imageOverlay.rotated=function(e,t,i,s,a,r){return new L.ImageOverlay.Rotated(e,t,i,s,a,r)};var s=L.imageOverlay.rotated;var a=class{constructor(){this.$levelSwitcher=document.querySelector("#lvl-switch"),this.$levelUp=this.$levelSwitcher.querySelector("#lvl-up"),this.$levelDown=this.$levelSwitcher.querySelector("#lvl-down"),this.$levelLabel=this.$levelSwitcher.querySelector("#lvl-lable")}show(){this.$levelSwitcher.classList.add("show")}hide(){this.$levelSwitcher.classList.remove("show")}setLevel(e){this.$levelLabel.innerText=e}};var r=class{constructor(e){if(!(e instanceof L.Map))throw TypeError();this._map=e,this.currentBuilding,this.currentLevel,this.levels={},this.view=new a,this.setupHandlers()}setupHandlers(){return this.switchUpHandler=this.switchUp.bind(this),this.switchDownHandler=this.switchDown.bind(this),this}enable(){this.view.$levelUp.addEventListener("click",this.switchUpHandler),this.view.$levelDown.addEventListener("click",this.switchDownHandler)}disable(){this.view.$levelUp.removeEventListener("click",this.switchUpHandler),this.view.$levelDown.removeEventListener("click",this.switchDownHandler)}createBuildingLevels(e){for(let i in e.levels){var t=s(this._map,e.levels[i],e._corners.topLeft,e._corners.topRight,e._corners.bottomLeft,{interactive:!1,opacity:0});this.levels[i]=t,t.addTo(this._map),e.defaultLevel==i&&t.setOpacity(1)}}selectBuilding(e){this.currentBuilding&&this.currentBuilding.id===e.id||(this.currentBuilding=e,this.currentLevel=e.defaultLevel,this.createBuildingLevels(e),this.enable(),this.view.show(),this.view.setLevel(e.defaultLevel))}unselectBuilding(){void 0!==this.currentBuilding&&(Object.values(this.levels).forEach(e=>e.remove()),this.currentBuilding=void 0,this.currentLevel=void 0,this.levels={},this.disable(),this.view.hide(),this.view.setLevel(""))}switchLevel(e){var t=this.currentLevel+e;if(t>=0&&void 0!==this.levels[t]){var i=this.currentLevel;this.currentLevel=t,this.levels[i].setOpacity(0),this.levels[this.currentLevel].setOpacity(1),this.view.setLevel(t)}}switchUp(){this.switchLevel(1)}switchDown(){this.switchLevel(-1)}hasSelectedBuilding(){return void 0!==this.currentBuilding}};var n=class{constructor(e,t){this._map=t,this.buildings=e,this.masterBuildingsLayer=new L.FeatureGroup([]),this.levelsSwitcher=new r(this._map),this.masterBuildingsLayer.addTo(this._map),this.enable().renderBuildingsContours(this.buildings)}setupHandlers(){}enable(){return this._map.on("moveend zoomend",()=>{var e=this._map.getBounds().getCenter(),t=this.masterBuildingsLayer.getLayers().find(t=>t.getBounds().contains(e));t&&this._map.getZoom()>=18?this.levelsSwitcher.selectBuilding(this.buildings[t._customId]):this.levelsSwitcher.hasSelectedBuilding()&&this.levelsSwitcher.unselectBuilding()}),this}renderBuildingsContours(){return(this.buildings instanceof Array?this.buildings:Object.values(this.buildings)).forEach(e=>{var t=s(this._map,e._contour,e._corners.topLeft,e._corners.topRight,e._corners.bottomLeft,{interactive:!0});t._customId=e.id,this.masterBuildingsLayer.addLayer(t)}),this}};function o(){this._listeners=[]}o.prototype={attach:function(e){this._listeners.push(e)},notify:function(...e){this._listeners.forEach(t=>{t(...e)})}};var l=o;var c=class{constructor(){this.$layerBtn=document.querySelector("#layers-btn"),this.$layersPanel=document.querySelector("#layers-sidebar")}showPanel(){this.$layersPanel.classList.add("show")}hidePanel(){this.$layersPanel.classList.remove("show")}addLayer(e){e=this.buildLayerElement(e);this.renderElement(e)}setWrapper(){var e=document.createElement("div");return e.classList.add("wrapper"),document.querySelector(".app .main .container").insertAdjacentElement("beforeend",e),e}removeWrapper(){var e=document.querySelector(".wrapper");e&&e.parentNode.removeChild(e)}buildLayerElement(e){return`\n            <div id=${e.id} class="sidebar__checkbox ${"active"===e.state?"":"sidebar__checkbox--disabled"}">\n                <div class="sidebar__btn shadow">\n                    <img src="../media/icons/${e.icon}.svg" alt="">\n                </div>\n                <span>${e.title}</span>\n            </div>\n        `}renderElement(e){this.$layersPanel.querySelector(".sidebar__container").insertAdjacentHTML("afterbegin",e)}toggleLayerVisibility(e){this.$layersPanel.querySelector("#"+e).classList.toggle("sidebar__checkbox--disabled")}};var d=class{constructor(e){this.layers=localStorage.getItem("layers")||{},this.view=new c,this.selectLayerEvent=new l,this.enable()}enable(){this.view.$layerBtn.addEventListener("click",e=>{this.view.setWrapper().addEventListener("click",e=>{this.view.removeWrapper(),this.view.hidePanel()},{once:!0}),this.view.showPanel()}),this.view.$layersPanel.addEventListener("click",e=>{e.target.id&&this.selectLayer(e.target)})}addLayer(e){this.view.addLayer(e)}selectLayer(e){var t=e.classList.contains("sidebar__checkbox--disabled")?"active":"disable";this.view.toggleLayerVisibility(e.id),this.selectLayerEvent.notify({id:e.id,state:t})}};var h=class{static buildDescription(e){var t=this.createDescriptionContainer(e);return t.innerHTML=this.fillDescriptionContainer(e),t}static createDescriptionContainer(e){var t=document.createElement("div");return t.id=e.id,t.classList.add("description"),t}static fillDescriptionContainer(e){let t={sun:"вс",mon:"пн",tue:"вт",wed:"ср",thu:"чт",fri:"пт",sat:"сб"},i=Object.keys(t)[(new Date).getDay()];return`\n            <div class="description__card shadow">\n                <div class="description__container">\n                    <div class="description__info">\n                        <div class="line">\n                            <div class="label">${e.type}</div>\n                            <div class="value">${e.title}</div>\n                        </div>\n                        <div class="line">\n                            <div class="label">Местоположение</div>\n                            <div class="value">Корпус ${e.building}, уровень ${e.level}</div>\n                        </div>\n                        <div id="worktime" class="line">\n                            <div class="label">Рабочее время</div>\n                            <ul>\n                                ${function(){let s="";return Object.keys(e.worktime).forEach(e=>{s+=`<li id="${e}" ${e===i?'class="active"':""}>${t[e]}</li>`}),s}()}\n                            </ul>\n                            <div class="value">Работает: ${e.worktime[i]}</div>\n                        </div>\n                    </div>\n                    \x3c!--<div class="description__view">\n                        <div class="description__img shadow">\n                            <img src="../media/places/Barbershop_A_6.jpg" alt="">\n                        </div>\n                    </div>--\x3e\n                </div>\n                ${e.link?`<button class="description__learn-more">\n                    <a href="${e.link}" class="description__learn-more--text">Узнать больше</span>\n                </button>`:""}\n            </div>\n        `}static renderDescription(e){document.querySelector(".app .main .container").insertAdjacentElement("beforeend",e)}static changeWorktime(e,t,i){var s=Array.from(e.querySelectorAll("li")),a=e.querySelector("#worktime .value");s.forEach(e=>{e.id===i?e.classList.add("active"):e.classList.remove("active")}),a.innerText="Работает: "+t.worktime[i]}static removeDescription(e){e.parentNode.removeChild(e)}};class v{constructor(e){this.description=e,this.$description=h.buildDescription(e),h.renderDescription(this.$description),this.enableDescription()}enableDescription(){return this.$description.querySelector(".description__card").addEventListener("click",e=>{e.stopPropagation()}),this.$description.querySelector("ul").addEventListener("click",e=>{e.target.id&&h.changeWorktime(this.$description,this.description,e.target.id)}),this.clickHandler=this.remove.bind(this),setTimeout(()=>document.addEventListener("click",this.clickHandler,{once:!0}),50),this}remove(e){h.removeDescription(this.$description),e.preventDefault()}}var m=class{constructor(){this.descriptions=[]}printDescription(e){this.descriptions=[],this.descriptions.push(new v(e))}},u=i.p+"2f603016ed222282cd1d94c081440e5f.svg";const p={building_0x12idww:{id:"building_0x12idww",building:"A",defaultLevel:6,levels:{6:i.p+"82a3966ef63ddd70295d914e4b93976f.svg",7:i.p+"ea2dd2aee1156c9bd8409a8468c355c7.svg",8:i.p+"dcac02582fafc95b19b8dfaeed17d369.svg"},_contour:u,_corners:{topLeft:{lat:43.02507858514359,lng:131.8935137987137},topRight:{lat:43.02479622315571,lng:131.89463496208194},bottomLeft:{lat:43.02421869798665,lng:131.8931120321577}}}};var g=class{constructor(){this._map,this.layers={},this.localStorageLayers=JSON.parse(localStorage.getItem("layers"))||{},this.masterLayer=new L.LayerGroup([]),this.descriptionsController=new m,this.layersController=new d,this.init();const e=async e=>{const t=await fetch(`./json/${e}.json`),i=await t.json();this.addLayer(i),this.addFeatures(Object.values(i.places),i.id)};e("layer_7gdt8bfan"),e("layer_a84waq888"),e("layer_z2zzty2yz"),e("layer_uu3tsrpq4"),e("layer_4drxl0x5g"),this.loadLayers()}init(){return this._map=L.map("mapid",{zoomControl:!1,minZoom:16,maxZoom:18}).setView([43.02450002995938,131.89426848759467],13).setMaxBounds([[43.01961,131.88065],[43.03954,131.90511]]),L.tileLayer("https://api.mapbox.com/styles/v1/fliseno1k/ckdvl3yid0ywl19mwm7b4xwa6/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmxpc2VubzFrIiwiYSI6ImNrOWg3NGxrNTBteWQzZWtmNzI4ZnZ3ZmkifQ.EV3RmKNJXhgCvRLIjB2zFQ",{tileSize:512,zoomOffset:-1}).addTo(this._map),this.masterLayer.addTo(this._map),this.bildingsController=new n(p,this._map),this.layersController.selectLayerEvent.attach(this.selectLayer.bind(this)),this}async loadLayers(){const e=await fetch("php/getJsonNames.php"),t=await e.json();console.log(t)}addLayers(e){e instanceof Array||(e=[e]),e.forEach(e=>{this.addLayer(e)})}addLayer(e){var t=L.geoJSON([],{onEachFeature:(t,i)=>{let s=Number.parseInt(e.markersSize);i.id=t.properties.id,i.options.icon=L.icon({iconUrl:`./media/icons/${("default"===t.properties.icon?void 0:t.properties.icon)||e.markersIcon||"default"}.svg`,iconSize:[s,s],iconAnchor:[s/2,s/2]})}});t.on("click",e=>{e.originalEvent.stopPropagation();let t=e.layer.feature.properties.description;t&&this.descriptionsController.printDescription(t),this._map.setView(e.latlng)}),this.layers[e.id]=t;var i=this.localStorageLayers[e.id];i?("active"===i&&this.masterLayer.addLayer(t),this.layersController.addLayer({id:e.id,title:e.title,icon:e.markersIcon,state:i})):(this.setToStorage({id:e.id,state:"active"}),this.masterLayer.addLayer(t),this.layersController.addLayer({id:e.id,title:e.title,icon:e.markersIcon,state:"active"}))}addFeatures(e,t){e instanceof Array||(e=[e]);var i=this.layers[t];i&&i.addData(e)}showLayer(e){const t=this.layers[e];t&&!this.masterLayer.hasLayer(t)&&this.masterLayer.addLayer(t)}hideLayer(e){const t=this.layers[e];t&&this.masterLayer.hasLayer(t)&&this.masterLayer.removeLayer(t)}selectLayer(e){"active"===e.state?this.showLayer(e.id):this.hideLayer(e.id),this.setToStorage(e)}setToStorage(e){this.localStorageLayers[e.id]=e.state,localStorage.removeItem("layers"),localStorage.setItem("layers",JSON.stringify(this.localStorageLayers))}},y=i.p+"17a3829ed24e43f028917d83fe147de8.svg";var f=class{constructor(){this.$messageBtn=document.querySelector(".btns-group #message-btn")}buildMessageBlock(){this.$messageBlock=this.createMessageBlock(),this.$messageBlock.innerHTML=this.fillMessageBlock(),this.render()}createMessageBlock(){var e=document.createElement("div");return e.classList.add("message-block"),e}fillMessageBlock(){return`\n            <div class="message-block__container shadow">\n                <div class="writable-message">\n                    <textarea name="mess" \n                        id="mess" \n                        onlyread="false" \n                        placeholder="Введите сообщение" \n                        maxlength="110" \n                        cols="30" rows="1"></textarea>\n                    <div id="send-btn" class="user-btn user-btn--small shadow">\n                        <img src="${y}" alt="">\n                    </div>\n                </div>\n            </div>`}render(){document.querySelector(".app .main .container").insertAdjacentElement("beforeend",this.$messageBlock),this.$messageBlock.classList.add("show")}removeMessageBlock(){try{this.$messageBlock.classList.remove("show"),setTimeout(()=>{this.$messageBlock.parentNode.removeChild(this.$messageBlock)},300)}catch(e){console.error(e)}}getValuerFromInput(){return this.$messageBlock.querySelector("textarea").value}showMarker(){this.$centeredMarker=document.querySelector(".centered-marker"),this.$centeredMarker.classList.add("show")}hideMarker(){this.$centeredMarker.classList.remove("show"),this.$centeredMarker=void 0}};var w=class{constructor(e){this._map=e,this._cookieName="nextmsgsndg",this.view=new f,this.clickHandler=e=>this.close(),this.notifyEvent=new l,this.enable()}enable(){return this.view.$messageBtn.addEventListener("click",e=>{document.querySelector("body").click(),e.stopPropagation(),this.enableChat()}),this}enableChat(){this.view.buildMessageBlock(),this.view.showMarker(),this.view.$messageBlock.addEventListener("click",e=>{if("send-btn"===e.target.id){var t=this.view.getValuerFromInput();this.sendMessage(t)}e.stopPropagation()}),document.addEventListener("click",this.clickHandler,{once:!0})}close(){this.view.removeMessageBlock(),this.view.hideMarker(),document.removeEventListener("click",this.clickHandler)}async sendMessage(e){const t=this._getCookie(this._cookieName);if(e.trim().length>5&&void 0===t){var i={Date:new Date,latlng:this._map.getCenter(),mess:e};try{const t=await fetch("php/bot.php",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(i)});t.status>=200&&t.status<300?(this._writeCookie(),this.notifyEvent.notify("user-notification",e)):this.notifyEvent.notify("system-notification","Возникла ошибка при отправке сообщения")}catch(e){console.error(e)}this.close()}else if(void 0!==t){var s=new Date(t)-(new Date).getTime();this.close(),this.notifyEvent.notify("system-notification","Отправка сообщений будет доступна через: "+this._msToTime(s))}}_msToTime(e){parseInt(e%1e3/100);var t=Math.floor(e/1e3%60);return Math.floor(e/6e4%60)+"мин "+(t=t<10?"0"+t:t)+"с."}_writeCookie(){var e=new Date;e.setTime(e.getTime()+3e5);var t="; expires="+e.toUTCString();document.cookie=this._cookieName+"="+e+t+"; path=/"}_getCookie(e){const t=("; "+document.cookie).split(`; ${e}=`);if(2===t.length)return t.pop().split(";").shift()}},_=i.p+"3251e2531d28b2aac088bb5a8efa06b6.svg";var b=class{constructor(e){this._map=e,this.$geolocationBtn=document.querySelector("#location-btn"),this.enable(),this.notifyEvent=new l}enable(){this._map.on("locationfound",e=>{this._map.getBounds().contains(e.bounds)?this.locate(e.latlng):this.throwLocationErrorNotification("Вы находитесь вне территории кампуса ДВФУ")}),this._map.on("locationerror",e=>{this.throwLocationErrorNotification("Возникла ошибка при опеределении вашей геопозиции")}),this.$geolocationBtn.addEventListener("click",e=>{e.stopPropagation(),this.getLocation(),document.querySelector("body").click()})}getLocation(){this._map.locate({setView:!1})}locate(e){this._map.setView(e,18),this.showLocationByMarker(e)}showLocationByMarker(e){var t=new L.Marker(e,{icon:new L.Icon({iconUrl:_,iconSize:[30,30],iconAnchor:[15,15]}),draggable:!1});t.addTo(this._map),document.addEventListener("click",()=>t.remove(),{once:!0})}throwLocationErrorNotification(e){this.notifyEvent.notify("system-notification",e)}};var k=class{constructor(){this.$notificationsBlock=document.querySelector(".notifications")}print(e){this._clear(),this.$notificationsBlock.insertAdjacentHTML("beforeend",`<div class="notification ${e.type}">${e.value}</div>`),this._enable()}_enable(){document.addEventListener("click",this._clear.bind(this),{once:!0})}_clear(){Array.from(this.$notificationsBlock.children).forEach(e=>{e.classList.add("hide"),setTimeout(()=>e&&e.parentNode===this.$notificationsBlock?this.$notificationsBlock.removeChild(e):void 0,300)})}};var $=class{constructor(e,t){if("user-notification"!==e&&"system-notification"!==e)throw new TypeError("Неверный тип оповещений: "+e);this.type=e,this.value=t}};var S=class{constructor(e){this.map=e,this._loopId,this.messages={},this.notifyEvent=new l,this.messagesLayer=new L.GeoJSON([],{onEachFeature:function(e,t){let i=e.properties;this.messages[i.id]=t,t.options.icon=new L.Icon({iconUrl:"./media/main/blue-pin-msg.svg",iconSize:[18.5,12.5],iconAnchor:[9.25,6.25]});var s=JSON.stringify(t.feature.properties.mess,null,2).replace(/\\"/g,"'").replace(/\\n/g,"<br>").replace(/\"/g,"");t.on("click",this.showMessage.bind(this,s))}}),this.messagesLayer.addTo(this.map),this.enableLoop()}enableLoop(){this.getMessages(),this._loopId=setInterval(this.getMessages.bind(this),3e4)}disableLoop(){clearInterval(this._loopId)}addMessage(e,t){if(2===e.geometry.coordinates.length){let i=this.messages[t.id],s=(new Date-new Date(t.Date))/36e5;s>=12?i&&i.remove([t.id]):s<12&&this.messagesLayer.addData([e])}}async getMessages(){try{const e=await fetch("php/getmess.php");(await e.json()).forEach(e=>{let t={type:"Feature",geometry:{type:"Point",coordinates:[e.latlng.lng,e.latlng.lat],properties:e}};this.addMessage(t,e)})}catch(e){console.error("[messages]: "+e)}}showMessage(e){this.notifyEvent.notify(e)}};function B(){this.map=new g,this.userChat=new w(this.map._map),this.geolocation=new b(this.map._map),this.messages=new S(this.map._map),this.notificationsPrinter=new k,this.setupHandlers().enable()}window.addEventListener("load",e=>{const t=document.querySelector(".preloader");setTimeout(()=>{t.classList.add("preloader--out")},1e3),setTimeout(()=>{t.parentElement.removeChild(t)},2500)}),B.prototype={setupHandlers(){return this.printNotificationHandler=this.printNotification.bind(this),this},enable(){return this.geolocation.notifyEvent.attach(this.printNotificationHandler),this.userChat.notifyEvent.attach(this.printNotificationHandler),this},printNotification(e,t){this.notificationsPrinter.print(new $(e,t))}},new B}]);