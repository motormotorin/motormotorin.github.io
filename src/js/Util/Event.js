
function Event() {
    this._listeners = [];
}

Event.prototype = {
    attach: function(listener) {
        this._listeners.push(listener);
    },

    notify: function(...args) {
        this._listeners.forEach(listener => {
            listener(...args);
        });
    }
}

export default Event;
