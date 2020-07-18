
var Event = function() {}

Event.prototype._events = [];

Event.prototype.on = function(event, listener) {
    (this._events[event] || (this._events[event] = [])).push(listener);
}

Event.prototype.emit = function(event, args) {
    (this._events[event] || []).slice().forEach(lsn => lsn(args));
}

export default Event;