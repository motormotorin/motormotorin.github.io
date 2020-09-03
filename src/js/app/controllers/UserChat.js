import UserChatView from '../views/UserChatView';
import Evt from '../../Util/Event';

class UserChat {
    constructor() {
        this._cookieName = "nextmsgsndg";
        this.view = new UserChatView();
        this.enable();

        this.clickHandler = (e) => this.close();
        this.dragHandler = (e) => e.stopPropagation();

        this.notifyEvent = new Evt();
    }

    enable() {
        this.view.$messageBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.open();
        });

        return this;
    }

    enableChatListeners() {
        this.view.$sendMessageBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            var value = this.view.getValuerFromInput();     
            this.sendMessage(value);
        }, {once: true});

        this.view.$messageBlock.addEventListener("click", (e) =>  {
            e.stopPropagation();
        });

        document.addEventListener("drag", this.dragHandler);
        document.addEventListener("click", this.clickHandler, {once: true});
    }

    open() {
        var html = this.view.createMsgBlockHTML();
        this.view.showMarker();
        this.view.renderMsgBlock(html).then(() => this.enableChatListeners());
    }

    close() {    
        this.view.removeMsgBlock();
        this.view.hideMarker();

        document.removeEventListener("drag", this.dragHandler);
        document.removeEventListener("click", this.clickHandler);
    }

    sendMessage(messageText) {
        const messageLock = this._getCookie(this._cookieName);

        if (messageText.length > 5 && messageLock === undefined) {
            this._writeCookie();
            this.close();

            this.notifyEvent.notify("user-notification", messageText);
    
        } else if (messageLock !== undefined) {
            var timeDifference = new Date(messageLock) - new Date().getTime();
            this.close();

            this.notifyEvent.notify("system-notification", `Отправка сообщений будет доступна через: ${this._msToTime(timeDifference)}`);
        }
    }

    _msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
      
        minutes = (minutes < 10) ? minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return minutes + "мин " + seconds + "с.";
    }

    _writeCookie() {
        var newDate = new Date();
        newDate.setTime(newDate.getTime() + (5 * 60 * 1000)); // 5 minutes

        var expires="; expires=" + newDate.toUTCString();
        document.cookie = this._cookieName + "=" + newDate + expires + "; path=/";
    }

    _getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}

export default UserChat;