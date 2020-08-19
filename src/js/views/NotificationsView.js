
function NotificationsView() {
    this.$notificationsBlock = document.querySelector(".app .notifications");
}

NotificationsView.prototype = {
    renderNotification: function(notificationType, value) {
        const notification = `
            <div class="notification ${notificationType}">${value}</div>    
        `;

        this.$notificationsBlock.insertAdjacentHTML("beforeend", notification);
    },

    clear: function() {
        Array.from(this.$notificationsBlock.querySelectorAll(".notification"))
            .forEach(ntf => {
                ntf.classList.add("hide");
                setTimeout(() => this.$notificationsBlock.removeChild(ntf), 300);
            });
    }
}

export default NotificationsView;

