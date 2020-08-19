import MessageView from '../views/MessageView';
import Evt from '../Util/Event';
import oneTimeListener from '../Util/oneTimeListener';

function Message(notifications) {
    this._state = "close";
    this._cookieName = "nextmsgsndg";
    
    this.notifications = notifications;
    this.view = new MessageView();
}

Message.prototype = {
    open: function() {
        if (this._state === "close") {
            this._state = "open";
            this.notifications.clear();
            this.view.renderMessageBlock().then(() => {
                this._enable();
            });
        }
    },

    close: function() {
        if (this._state === "open") {
            this._state = "close";
            this.view.removeMessageBlock();
        }
    },

    _enable: function() {
        this.view.$messageBlock.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        this.view.$sendMessageBtn.addEventListener("click", (e) => {
            const value = this.view.getValuerFromInput();
            
            this._sendMessage(value);
        });

        oneTimeListener("click", this.close.bind(this));
    },

    _sendMessage: function(messageText) {
        const messageLock = this._getCookie(this._cookieName);

        if (messageText.length > 5 && messageLock === undefined) {
            this.close();
            this._writeCookie();
            this.notifications.notify("user-notification", messageText);
    
        } else if (messageLock !== undefined) {
            var timeDifference = new Date(messageLock) - new Date().getTime();

            this.close();
            this.notifications.notify("system-notification", `Отправка сообщений будет доступна через: ${this._msToTime(timeDifference)}`);            
        }
    },

    _msToTime: function(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
      
        minutes = (minutes < 10) ? minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
      
        return minutes + "мин " + seconds + "с.";
    },

    _writeCookie: function() {
        var newDate = new Date();
        newDate.setTime(newDate.getTime() + (5 * 60 * 1000)); // 5 minutes

        var expires="; expires=" + newDate.toUTCString();
        document.cookie = this._cookieName + "=" + newDate + expires + "; path=/";
    },

    _getCookie: function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}

export default Message;