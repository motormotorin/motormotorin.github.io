import '../../styles/app.css';

import Map from './controllers/Map';


import UserChat from './controllers/UserChat';
import MapObjects from './models/MapObjects';
import Geolocation from './controllers/Geolocation';
import NotificationsPrinter from './models/NotificationsPrinter';
import Notification from './models/Notification';
import Messages from './controllers/Messages';


import defaultIcon from '../../media/icons/default.svg';

window.addEventListener("load", (e) => {
    const preloader = document.querySelector(".preloader");

    setTimeout(() => {
        preloader.classList.add("preloader--out");
    }, 1000);

    setTimeout(() => {
        preloader.parentElement.removeChild(preloader);
    }, 2500);
});

function App() {
    this.map = new Map();
    this.userChat = new UserChat();
    // this.mapObjects = new MapObjects();
    this.geolocation = new Geolocation(this.map._map);
    this.messages = new Messages(this.map._map);
    this.notificationsPrinter = new NotificationsPrinter();

    this.setupHandlers().enable();
}

App.prototype = {
    setupHandlers() {
        this.printNotificationHandler = this.printNotification.bind(this);
        return this;
    },

    enable() {
        this.geolocation.notifyEvent.attach(this.printNotificationHandler);
        this.userChat.notifyEvent.attach(this.printNotificationHandler);
        return this;
    },

    printNotification(type, text) {
        this.notificationsPrinter.print(new Notification(type, text));
    },
}

new App();
