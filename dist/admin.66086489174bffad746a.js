!function(e){var i={};function t(a){if(i[a])return i[a].exports;var r=i[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=i,t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,i){if(1&i&&(e=t(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var r in e)t.d(a,r,function(i){return e[i]}.bind(null,r));return a},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},t.p="",t(t.s=8)}([function(e,i,t){"use strict";function a(){this._listeners=[]}a.prototype={attach:function(e){this._listeners.push(e)},notify:function(...e){this._listeners.forEach(i=>{i(...e)})}},i.a=a},function(e,i,t){"use strict";i.a=t.p+"./media/3251e2531d28b2aac088bb5a8efa06b6.svg"},,function(e,i,t){var a='<!doctype html> <html> <title> Campus GIS </title> <head> <meta name=viewport content="initial-scale=1,maximum-scale=1,user-scalable=no"/> <meta http-equiv=Content-Type content="text/html; charset=utf-8"/> <link rel=stylesheet href=https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css /> <script src=https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.js><\/script> </head> <body> <div class=editor> <header class=editor-header> <div class=editor-app-bar> <button id=create-btn class="editor-button editor-button_size_xl"> <span class=editor-button__text>Создать место</span> </button> <button id=save-btn class="editor-button editor-button_size_xl" style=background:#caf369> <span class=editor-button__text>Сохранить карту</span> </button> </div> </header> <aside id=place-editing-sidebar class="editor-sidebar editor-geoobject-editor editor-sidebar-hide"> <div id=place-description class=data-container__info-form> <div class=info-line> <label for=type class=info-line__label>Тип</label> <input type=text id=type class=info-line__input autocomplete=off> </div> <div class=info-line> <label for=title class=info-line__label>Название</label> <input type=text id=title class=info-line__input autocomplete=off> </div> <div class=whitespace-line></div> <div class=info-line> <label for=building class=info-line__label>Корпус</label> <input type=text id=building class=info-line__input autocomplete=off> </div> <div class=info-line> <label for=level class=info-line__label>Уровень</label> <input type=text id=level class=info-line__input autocomplete=off> </div> <div class=whitespace-line></div> <div class="info-line worktime-field"> <label for=worktime class=info-line__label>Рабочее время</label> <ul class=worktime-field__week> <li id=mon class=worktime-field__day>пн</li> <li id=tue class=worktime-field__day>вт</li> <li id=wed class=worktime-field__day>ср</li> <li id=thu class=worktime-field__day>чт</li> <li id=fri class=worktime-field__day>пт</li> <li id=sat class=worktime-field__day>сб</li> <li id=sun class=worktime-field__day>вс</li> </ul> <input type=text id=worktime class="info-line__input worktime-field__input" autocomplete=off> </div> <div class=whitespace-line></div> <div class=info-line> <label for="" class=info-line__label>Фотография</label> </div> <div class=icons-library> <button id=select-from-library class="icons-library__button data-container__button data-container__button-100per"> Выбрать из галереи </button> <div class=icons-library__container> </div> </div> <div class=info-line> <label for=size class=info-line__label>Размер</label> <input type=range id=size class=info-line__input autocomplete=off min=10 , max=40> </div> <form class=image-form> <label for=image class=image-form__label>Загрузить фотографию</label> <input type=file id=image class=image-form__input accept=image/*> <div class=image-form__preview> <div class=image-form__delete-btn> <img src='+t(4)(t(5))+' alt=""> </div> </div> </form> </div> <div class=editor-submit-form> <button id=cancel class="editor-button editor-button_size_l"> <span class=editor-button__text>Отмена</span> </button> <button id=save class="editor-button editor-button_size_l editor-submit-form__submit"> <span class=editor-button__text>Сохранить</span> </button> </div> </aside> </div> <div class=container> <div class=wrap> <div class="marker-btn shadow"></div> </div> </div> <div id=mapid></div> </body> </html>';e.exports=a},function(e,i,t){"use strict";e.exports=function(e,i){return i||(i={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(i.hash&&(e+=i.hash),i.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e)}},function(e,i,t){"use strict";t.r(i),i.default=t.p+"./media/785a975806dbd80c55fdaa578988f592.svg"},function(e,i,t){},,function(e,i,t){"use strict";t.r(i);t(3),t(6);var a=t(1);var r=class{constructor(){this.places={},this.modifiedPlaces={},this.$saveMapData=document.querySelector("#save-btn"),this.$saveMapData.addEventListener("click",()=>{this.saveMap()})}async getPlace(){fetch("/getMarkers.php").then(e=>{this.places=JSON.parse(e)})}async saveMap(){console.log("Map has been saved")}setPlace(e){this.places[e.id]=e,this.modifiedPlaces[e.id]=e,console.log(e)}removePlace(){}},s=t(0);var n=class{constructor(){this.$aside=document.querySelector("#place-editing-sidebar"),this.$panel=document.querySelector("#place-description"),this.$worktimeField=this.$panel.querySelector(".worktime-field"),this.$imgForm=this.$panel.querySelector(".image-form"),this.$library=this.$panel.querySelector(".icons-library"),this.$rangeInput=this.$panel.querySelector("input#size")}show(){this.$aside.classList.remove("editor-sidebar-hide")}hide(){this.$aside.classList.add("editor-sidebar-hide")}highlightSelectedDay(e,i=!1){var t=Array.from(this.$worktimeField.querySelectorAll(".worktime-field__day"));i?t.forEach(i=>{i.id===e&&i.classList.add("worktime-field__day--active")}):t.forEach(i=>{i.id===e?i.classList.add("worktime-field__day--active"):i.classList.remove("worktime-field__day--active")})}insertInInputs(e){this.$panel.querySelectorAll("input").forEach(i=>{e.hasOwnProperty(i.id)&&"image"!==i.id&&"object"!=typeof e[i.id]&&(i.value=e[i.id])})}insertWorktime(e){this.$worktimeField.querySelector("input").value=e||""}getSelectedDaysIds(){return Array.from(this.$worktimeField.querySelectorAll(".worktime-field__day--active")).map(e=>e.id)}unselectDays(){Array.from(this.$worktimeField.querySelector(".worktime-field__day--active")).forEach(e=>e.classList.remove(".worktime-field__day--active"))}insertWorktime(e){this.$worktimeField.querySelector("input").value=e}showLibrary(){this.$library.querySelector(".icons-library__container").style.display="flex"}hideLibrary(){this.$library.querySelector(".icons-library__container").style.display="none"}renderLibrary(e){var i=this.$library.querySelector(".icons-library__container");e.forEach(e=>{var t=this.libraryItemHTML(e);i.insertAdjacentHTML("beforeend",t)})}clearLibrary(){this.$library.querySelector(".icons-library__container").innerHTML=""}libraryItemHTML(e){return`\n            <div class="icons-library__item">\n                <img src="${e}" alt="">\n            </div>\n        `}renderSelectedLibraryItem(e){var i=this.selectedLibraryItemHTML(e);this.$library.insertAdjacentHTML("afterbegin",i)}removeSelectedLibraryItem(){var e=this.$library.querySelector(".selected-icon");e&&this.$library.removeChild(e)}selectedLibraryItemHTML(e){return`\n            <div class="selected-icon">\n                ${this.libraryItemHTML(e)}\n                <span class="selected-icon__icon-name">${e.split("/").slice(-1)[0]}</span>\n                \x3c!--<img class="selected-icon__unselect-icon" src="media/add.svg" alt="" style="transform: rotate(45deg)">--\x3e\n            </div>\n        `}renderImagePreview(e){var i=this.$imgForm.querySelector(".image-form__preview"),t=document.createElement("img");t.src=e,t.classList.add("image-form__img"),i.style.display="block",i.insertAdjacentElement("afterbegin",t)}},l=t.p+"./media/c0b4cbcfd648806d999516a1b7a244b3.svg",o=t.p+"./media/ffcafe384bf4c1032ae12e883edfce15.svg",c=t.p+"./media/0b5f15a05e7ddb302961d78575d3e450.svg",d=t.p+"./media/68201c90635148678bf063640482153c.svg",h=t.p+"./media/e7df07fb319f81ec2fd2d1c52b99ccbc.svg",m=t.p+"./media/d512f645560b9e2643419a818fddaf4c.svg",u=t.p+"./media/89efae1080b86fc099548f5d99acc13a.svg";var p=class{constructor(){this.view=new n,this.changePlaceIconEvent=new s.a,this.changeIconSizeEvent=new s.a,this.setupHandlers()}setupHandlers(){return this.changeHandler=this.writeProperty.bind(this),this.selectDayHandler=this.selectDay.bind(this),this.writeWorktimeHandler=this.writeWorktime.bind(this),this.selectImageHandler=this.selectImage.bind(this),this.libraryActionHandler=this.libraryAction.bind(this),this.changeIconSizeHandler=this.changeIconSize.bind(this),this}enable(){return this.view.$worktimeField.addEventListener("click",this.selectDayHandler),this.view.$worktimeField.addEventListener("change",this.writeWorktimeHandler),this.view.$panel.addEventListener("change",this.changeHandler),this.view.$imgForm.addEventListener("change",this.selectImageHandler),this.view.$library.addEventListener("click",this.libraryActionHandler),this.view.$rangeInput.addEventListener("input",this.changeIconSizeHandler),this.view.show(),this}disable(){return this.view.$worktimeField.removeEventListener("click",this.selectDayHandler),this.view.$worktimeField.removeEventListener("change",this.writeWorktimeHandler),this.view.$panel.removeEventListener("change",this.changeHandler),this.view.$imgForm.removeEventListener("change",this.selectImageHandler),this.view.$library.removeEventListener("click",this.libraryActionHandler),this.view.$rangeInput.removeEventListener("input",this.changeIconSizeHandler),this.view.hide(),this}setPlace(e){this.place=e,this.view.insertInInputs(this.place)}selectDay(e){var i=e.target.closest(".worktime-field__day");i&&(this.view.highlightSelectedDay(i.id,e.ctrlKey),this.view.insertWorktime(e.ctrlKey?"":this.place.worktime[i.id])),e.stopPropagation()}writeWorktime(e){this.view.getSelectedDaysIds().forEach(i=>{this.place.worktime[i]=e.target.value}),e.stopPropagation()}writeProperty(e){"image"===e.target.id?this.place[e.target.id]=e.target.files[0]:this.place[e.target.id]=e.target.value,e.stopPropagation()}selectImage(e){this.view.renderImagePreview(URL.createObjectURL(e.target.files[0]))}libraryAction(e){const i=[l,o,c,d,h,m,u];if(e.target.closest(".icons-library__item")){var t=e.target.closest(".icons-library__item").querySelector("img").src;this.view.hideLibrary(),this.view.clearLibrary(),this.view.removeSelectedLibraryItem(),this.view.renderSelectedLibraryItem(t),this.changePlaceIconEvent.notify(t)}else e.target.closest(".icons-library__button")&&(this.view.clearLibrary(),this.view.renderLibrary(i),this.view.showLibrary())}changeIconSize(e){this.changeIconSizeEvent.notify(e.target.value)}clear(){this.view.$panel.querySelectorAll("input").forEach(e=>{e.value="",e.src=""}),this.view.hideLibrary(),this.view.clearLibrary(),this.view.removeSelectedLibraryItem()}};const b=new L.Map("mapid",{zoomControl:!1}).setView([43.02825898949743,131.89296126365664],13).setMaxBounds([[43.050952,131.85915],[42.994509,131.94232]]);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{minZoom:16,maxZoom:19,attribution:'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'}).addTo(b),L.RD_Marker=L.Marker.extend({initialize(e,i){this.id=function(e){if(e&&"string"==typeof e)return e+"_"+Math.random().toString(36).substr(2,9);throw new TypeError("invalid format of prefix")}("marker"),this._enabled=!1,i=L.Util.setOptions(this,i),L.Marker.prototype.initialize.call(this,e,i),this.on("dragend",this._setLatlng)},enable(){this.dragging.enable(),this._enabled=!0},disable(){this._enabled=!1,this.dragging.disable()},toGeoJSON(){return{type:"Feature",properties:{shape:"Marker"},geometry:{type:"Point",coordinates:""+[this.getLatLng().lat,this.getLatLng().lng]},id:""+this.id}},setIconImg(e){this.options.icon.options.iconUrl=impgPath},setIconSize(e){var i=this.options.icon;i.options.iconSize=[e,e],i.options.iconAnchor=[e/2,e/2]},_setLatLng(e){this.setLatLng(e.latlng)}});class f{constructor(e){this.state="disable",this.data=e,this.descriptionPanel=new p}toggleState(e){"enable"!==this.state&&(this.workingMarker=e,this.workingMarker.enable(),this.descriptionPanel.enable())}}L.Map.addInitHook(new class{constructor(){this.map=b,this.isEditing=!1,this.data=new r,this.workingLayer=new L.FeatureGroup,this.placeRedactor=new f(this.data),this.$createButton=document.querySelector(".marker-btn"),this.workingLayer.on("layeradd",e=>{e.layer.on("click",()=>this.placeRedactor.toggleState(e.layer))}),this.workingLayer.addTo(this.map),this.enable()}enable(){this.$createButton.addEventListener("click",this.enableMarkerAdding.bind(this))}enableMarkerAdding(){if(this.isEditing)return;const e=e=>i.setLatLng(e.latlng);var i=new L.RD_Marker;i.setIcon(new L.Icon({iconUrl:a.a,iconSize:[25,25],iconAnchor:[12.5,12.5]})),this.map.once("mouseover",t=>{e(t),i.addTo(this.map),this.map.on("mousemove",e),this.map.once("click",t=>{this.map.off("mousemove",e),i.remove(),i.addTo(this.workingLayer)})})}})}]);