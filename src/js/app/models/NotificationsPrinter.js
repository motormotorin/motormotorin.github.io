class NotificationsPrinter {
    constructor() {
        this.$notificationsBlock = document.querySelector(".notifications");
    }

    print(notification) {
        this._clear();
        this.$notificationsBlock.insertAdjacentHTML("beforeend", 
            `<div class="notification ${notification.type}">${notification.value}</div>`);
        this._enable();
    }

    _enable() {
        document.addEventListener("click", this._clear.bind(this), {once: true});
    }

    _clear() {   
        Array.from(this.$notificationsBlock.children).forEach(ntf => {
            ntf.classList.add("hide");
            setTimeout(() => ntf && ntf.parentNode === this.$notificationsBlock ? this.$notificationsBlock.removeChild(ntf) : void 0, 300);
        });
    }
}

export default NotificationsPrinter;