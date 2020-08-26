import generateUniqueId from '../Util/generateUniqueId';

export default function Marker(marker) {
    if (marker) {
        this.createFromExist(marker);

    } else {
        this.id = generateUniqueId("marker");
        this.state = "new";
        this.title = "";
        this.building = "";
        
        this.level = "";
        this.worktime = {
            "pn": "", "vt": "", "sr": "", "ch": "", 
            "pt": "", "sb": "", "vs": ""
        };
        this.icon = "";
        this.image = "";
        this.imageFile = "";
        this.latlng = undefined;
    }
}

Marker.prototype.createFromExist = function(marker) {
    if (typeof marker === "string") marker = JSON.parse(marker);
    for (let key in marker) {
        typeof marker[key] !== "function" 
            ? this[key] = marker[key] 
            : undefined;
    }
    this.state = "old";
}

Marker.prototype.convertToJSON = function() {
    ["imageFile", "state"].forEach(prop => delete this[prop]);   
    return JSON.stringify(this);
}