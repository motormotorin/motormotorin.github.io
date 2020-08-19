import './styles/style.css';
import Map from './js/controllers/Map';
import LeftSidebar from './js/controllers/LeftSidebar';
import Message from './js/controllers/Message';
import MapData from './js/models/MapData';
import FooterToolbar from './js/controllers/FooterToolbar';
import Notifications from './js/controllers/Notifications';


window.addEventListener("load", (e) => {
    const preloader = document.querySelector(".preloader");
    preloader.classList.add("preloader--out");
    setTimeout(() => {
        preloader.parentElement.removeChild(preloader);
    }, 500);
});


function App() {

    this._currentOption = undefined;

    this.map = new Map();
    this.mapData = new MapData();

    this.notifications = new Notifications();
    this.footerToolbar = new FooterToolbar();
    this.leftSidebar = new LeftSidebar();
    this.message = new Message(this.notifications);
    
    this.mapData.loadPlacesLayers().then((data) => {
        this.renderPlacesLayers(data);
    });

    this.setupHandlers()
        .enable();
}

App.prototype = {
    setupHandlers: function() {
        this.toggleLayerVisibilityHandler = this.toggleLayerVisibility.bind(this);
        this.selectFooterToolbarOptionHandler = this.selectFooterToolbarOption.bind(this);

        return this;
    },
    
    enable: function() {
        this.leftSidebar.toggleLayerDisablingEvent.attach(this.toggleLayerVisibilityHandler);
        this.footerToolbar.selectOptionEvent.attach(this.selectFooterToolbarOptionHandler);

        return this;
    },

    renderPlacesLayers: function(layers) {
        if (!(layers instanceof Array)) layers = Object.values(layers);

        const localStorageLayers = JSON.parse(localStorage.getItem("layers")) || {};
        if (localStorageLayers !== {}) {
            layers.forEach(layer => {
                if (localStorageLayers.hasOwnProperty(layer.id)) {
                    layer.state = localStorageLayers[layer.id];
                } else {
                    layer.state = "active";
                    localStorageLayers[layer.id] = "active";
                }
            });
        } else {
            layers.forEach(layer => {
                layer.state = "active";
                localStorageLayers[layer.id] = "active";
            });
        }

        localStorage.removeItem("layers");
        localStorage.setItem("layers", JSON.stringify(localStorageLayers));

        this.leftSidebar.renderLayersItems(layers);
        this.map.addPlacesLayers(layers);
        // render map objects;
    },

    toggleLayerVisibility: function(layerId, state) {
        const lclStorageLayers = JSON.parse(localStorage.getItem("layers"));
        lclStorageLayers[layerId] = state;

        switch(state) {
            case "active": 
                this.map.showLayer(layerId);
                break;
            case "disable": 
                this.map.hideLayer(layerId);
        }

        localStorage.removeItem("layers");
        localStorage.setItem("layers", JSON.stringify(lclStorageLayers));
    },

    selectFooterToolbarOption: function(optionId) {

        switch(optionId) {
            case "layers_ctrl": 
                this._selectOption(this.leftSidebar);
                break;

            case "pin_ctrl": 
                this._selectOption(this.message);
                break;
        }

    },

    _selectOption: function(option) {
        if (this._currentOption !== undefined && this._currentOption !== option) this._currentOption.close();
        this._currentOption = option;
        this._currentOption.open();
    },

    showFooterToolbar: function() {
        this.footerToolbar.show();
    },

    hideFooterToolbar: function() {
        this.footerToolbar.hide();
    },
}

new App();









// const burgerBlock = document.querySelector('.burger');
// const rightSideMenu = document.querySelector('.menu');

// const optionMenu = document.querySelector('.option-menu');
// const arrowSVG = document.querySelector('#arrow');
// const options = document.querySelectorAll('.option-item-top');

// const createMessageOption = document.querySelector('#msgopt');
// const creatingMessageBlock = document.querySelector('.create-message');
// const sendMessageButton = document.querySelector('.send-btn button');
// const textArea = document.querySelector('#mess');
// const messageLength = document.querySelector('.message-length');

// var marker = document.querySelector('.centered-marker');

// var openedElements = [];

// function toggleRightSideMenu() {
//     [rightSideMenu, ...burgerBlock.children].forEach(el => el.classList.toggle('open'));
// }


// function addCenteredMarker() {
//     const imgEl = document.createElement('img');
//     imgEl.classList.add('pin-marker');
//     imgEl.src = './media/icons/blue-pin-msg.svg';
//     marker.appendChild(imgEl);
// }

// function opencreatingMessageBlock() {
//     creatingMessageBlock.style.transform = 'translate(-50%, 0%)';
//     creatingMessageBlock.classList.add('active');
// }

// function removeCenteredMarker() {
//     marker.innerHTML = '';
// }

// function initMapListeners() {
//     map.on('click', destroyMessageInterface);
// }

// function initMessageInterface() {
//     addCenteredMarker();
//     opencreatingMessageBlock();
//     initMapListeners();
// }

// function removeMapListeners() {
//     map.off('click', destroyMessageInterface);
// }

// function closecreatingMessageBlock() {
//     creatingMessageBlock.style.transform = 'translate(-50%, calc(100% + 20px))';
//     creatingMessageBlock.classList.remove('active');
// }

// function cleancreatingMessageBlock() {
//     textArea.value = '';
//     messageLength.innerText = 0;
//     messageLength.style.display = 'none';
//     sendMessageButton.disabled = true;
// }

// function destroyMessageInterface() {
//     closecreatingMessageBlock();
//     cleancreatingMessageBlock();
//     removeCenteredMarker();
//     removeMapListeners();
// }

// var _mesId = 0;
// function openMessage() {  // should be bind with object included mess and date
//     closeMessage();

//     const messageHTML = `
//         <div id="mess-${_mesId}" class="message shadow">
//             <div id="mess-close-${_mesId}"class="close-btn"></div>
//             <div class="text-cont">
//                 <div class="message-text">
//                     <p>${this.mess}</p>
//                 </div>
//                 <div class="message-date">
//                     <p>${this.date}</p>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     document.body.insertAdjacentHTML('beforeend', messageHTML);
//     document.querySelector(`#mess-close-${_mesId}`).addEventListener('click', () => {
//         closeMessage();
//     });

//     setTimeout(() => {
//         document.querySelector(`#mess-${_mesId}`).style.transform = 'translate(-50%, 0%)';
//         _mesId++;
//     }, 100);
// }

// function closeMessage() {
//     let elem = document.querySelector(`#mess-${_mesId - 1}`);
//     if (elem) {
//         elem.style.backgroundColor = 'rgb(216, 216, 216)';
//         elem.style.transform = 'translate(-50%, calc(100% + 50px))';
//         setTimeout(() => {
//             elem.parentNode.removeChild(elem);
//         }, 300);
//     }
// }

// function getCookie(name) {
//     let matches = document.cookie.match(new RegExp(
//       "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? matches : undefined;
// }

// function setCookieTimer() {
//     let now = new Date();
//     let newTime = new Date(now.getTime() + 5*60000);
//     document.cookie = `_msgtimer=true; path=/; expires=${newTime.toUTCString()}`;
// }

// sendMessageButton.addEventListener('click', () => {
    
//     if (textArea.value.replace(/\s/g, '').length) {
//         if (!getCookie('_msgtimer')) {
//             sendMessageButton.setAttribute('disabled', true);
//             sendMessageButton.classList.add('state-1');

//             const JSONdata = JSON.stringify({ 
//                 Date: new Date(),
//                 latlng: map.getCenter(),
//                 mess: textArea.value
//             });

//             setTimeout(() => {
//                 $.ajax({
//                     type: "POST",
//                     url: "bot.php",
//                     data: {request:JSONdata},
//                     success: function(res) {
//                         sendMessageButton.classList.add('state-2');
//                         setTimeout(() => {
//                             sendMessageButton.classList.remove('state-1', 'state-2');
//                             setTimeout(() => {
//                                 destroyMessageInterface();
//                             }, 300);
//                         }, 1500);
//                         setCookieTimer();
//                     },
//                     error: () => {
//                         sendMessageButton.lastElementChild.innerText = 'Failed!';
//                         sendMessageButton.classList.add('state-2');               
//                         setTimeout(() =>  {
//                             sendMessageButton.classList.remove('state-1', 'state-2');      
//                             sendMessageButton.disabled = false;
//                             setTimeout(() => {
//                                 sendMessageButton.lastElementChild.innerText = 'Done!'
//                             }, 300);
//                         }, 1500);
//                     }
//                 }); 
//             }, 1000);
//         } else {
//             alert('Отправка сообщений временно недоступна');
//         }
//     }
// });

// textArea.addEventListener('input', () => {
//     const maxLength = 100;
//     let length = textArea.value.length;
//     sendMessageButton.disabled = textArea.value.replace(/\s/g, '').length ? false : true;

//     if (length >= 1) {
//         if (length >= maxLength) {
//             textArea.value = textArea.value.substring(0, maxLength-1);
//         }
//         messageLength.style.display = 'inline';
//         messageLength.innerText = `${length}/${maxLength}`;
//     } else {
//         messageLength.style.display = 'none';
//     }
// });

// createMessageOption.addEventListener('click', () => {
//     if (!creatingMessageBlock.classList.contains('active')) {
//         toggleOptionMenu();
//         initMessageInterface();  
//     }
// });

// arrowSVG.addEventListener('click', () => toggleOptionMenu());
// burgerBlock.addEventListener('click', () => toggleRightSideMenu());

// $(window).on('load', () => {
//     let $preloader = $('.preloader');	
//     $preloader.delay(1000).fadeOut('slow', function() {
//         $(this).remove();
//     });
// });