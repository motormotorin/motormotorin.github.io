import NotificationsView from '../views/NotificationsView';
import oneTimeListener from '../Util/oneTimeListener';

function Notifications() {
    this.view = new NotificationsView();
}

Notifications.prototype = {
    notify: function(notificationType, value) {
        this.view.renderNotification(notificationType, value);
        this._enable();
    },

    clear: function() {
        this.view.clear();
    },

    _enable: function() {
        oneTimeListener("click", this.clear.bind(this));
    }
}

export default Notifications;