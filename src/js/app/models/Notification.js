class Notification {
    constructor(type, value) {
        if (type !== "user-notification" && type !== "system-notification") 
            throw new TypeError(`Неверный тип оповещений: ${type}`);
        
            this.type = type;
            this.value = value;
    }
}

export default Notification;