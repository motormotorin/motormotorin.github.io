import UserChatView from '../views/UserChatView';
import Evt from '../../Util/Event';

class UserChat {
    constructor(map) {
        this._map = map;
        this._cookieName = "nextmsgsndg";
        this.view = new UserChatView();

        this.clickHandler = (e) => this.close();

        this.notifyEvent = new Evt();

        this.enable();
    }

    enable() {
        this.view.$messageBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.enableChat();
        });

        return this;
    }

    enableChat() {
        this.view.buildMessageBlock();
        this.view.showMarker();

        this.view.$messageBlock.addEventListener("click", (e) => {
            if (e.target.id === "send-btn") {
                var text = this.view.getValuerFromInput();
                this.sendMessage(text);
            }

            e.stopPropagation();
        });

        document.addEventListener("click", this.clickHandler, {once: true});
    }

    close() {    
        this.view.removeMessageBlock();
        this.view.hideMarker();
        document.removeEventListener("click", this.clickHandler);
    }

    sendMessage(messageText) {
        const messageLock = this._getCookie(this._cookieName);

        if (messageText.trim().length > 5 && messageLock === undefined) {
            try {
                var JSONData = JSON.stringify({
                    Date: new Date(), 
                    latlng: this._map.getCenter(),
                    mess: messageText
                });

                fetch("bot.php", {
                    method: "POST", 
                    body: JSONData,
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(() => this.notifyEvent("user-notification", messageText),
                      () => this.notifyEvent.notify("system-notification", 'Возникла ошибка при отправке сообщения')
                ).catch((e) => console.error(e));
                
                    
            } catch(e) {
                this.notifyEvent.notify("system-notification", 'Возникла ошибка при отправке сообщения');
            }

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