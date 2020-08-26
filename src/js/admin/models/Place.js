import generateUniqueId from '../../Util/generateUniqueId';

function Place(latlng) {
    this.id = generateUniqueId("place");
    this.type;
    this.title;
    this.building;
    this.level;
    this.worktime = {
        mon: "", tue: "", wed: "", thu: "", 
        fri: "", sat: "", sun: ""
    };
    this.icon;
    this.image;
    this.latlng = latlng;

}

export default Place;