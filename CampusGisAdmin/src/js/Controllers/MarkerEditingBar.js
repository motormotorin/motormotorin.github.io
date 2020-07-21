import MarkerEditingBarView from '../Views/MarkerEditingBarView';
import Marker from '../Models/Marker';
import { MarkerEditingBarDOMs as elements }  from '../Util/Base';


function MarkerEditingBar(marker) {
    this._marker = marker || new Marker();
    this._mrkEdBarView = new MarkerEditingBarView();

    this.initHandlers();
    if (this._marker.state !== "new") this.setInfoByExistingObject(this._marker);
}

MarkerEditingBar.prototype.initHandlers = function() {
    this._mrkEdBarView.markerEditingBar.addEventListener("change", (e) => {
        this.setValueFromInputs(e.target.id, e.target.value);
    });

    this._mrkEdBarView.changesApplyBlock.addEventListener("click", (e) => {
        console.log(e.target.id);
    });

    this._mrkEdBarView.worktimeField.addEventListener("click", (e) => {
        if (e.target.closest(`.${elements.worktimeDay}`)) {            
            if (e.ctrlKey) {
                this._mrkEdBarView.insertWorktime();
                this._mrkEdBarView.highlightSelectedDay(e.target.id, true);
                
            } else {
                this._mrkEdBarView.isDaySelect(e.target.id) 
                    ? this._mrkEdBarView.insertWorktime()
                    : this._mrkEdBarView.insertWorktime(this._marker.worktime[e.target.id]);
                this._mrkEdBarView.highlightSelectedDay(e.target.id, false);
            }  
        }       
    });

    this._mrkEdBarView.worktimeField.addEventListener("change", (e) => {
        e.stopPropagation();
        this.setWorktime(e.target.value);
    });

    this._mrkEdBarView.iconsLib.addEventListener("click", (e) => {
        if (e.target.id === elements.selectFromLibBtnId) {
            this.loadLibrary();

        } else if (e.target.closest(`.${elements.iconsLibItem}`)) {
            this.setMarkerIcon(); // @param name
            this._mrkEdBarView.renderSelectedIcon(); // @param name
            this._mrkEdBarView.hideLibrary();

        } else if (e.target.closest(`.${elements.unselectIconBtn}`)) {
            this.setMarkerIcon(""); 
            this._mrkEdBarView.clearSelectedIcon();
        }
    });

    this._mrkEdBarView.imageForm.addEventListener("change", (e) => {
        e.stopPropagation();
        const file = e.target.files[0];
        this._marker.image = file;
        this._mrkEdBarView.renderImagePreview(file);
    });
}

MarkerEditingBar.prototype.setInfoByExistingObject = function() {
    this._mrkEdBarView.setInfoInInputs(this._marker); // title, description, building and level
    this._mrkEdBarView.renderSelectedIcon(this._marker.icon);
    // -- set image
}

MarkerEditingBar.prototype.setValueFromInputs = function(prop, value) {
    if (this._marker.hasOwnProperty(prop)) this._marker[prop] = value;
}

MarkerEditingBar.prototype.setWorktime = function(worktime) {
    this._mrkEdBarView.getSelectedDaysId().forEach(day => {
        this._marker.worktime[day] = worktime;
    });
}

MarkerEditingBar.prototype.setMarkerIcon = function(name) {
    this._marker.icon = name;
}

MarkerEditingBar.prototype.setMarkerImage = function(file) {
    this._marker.imageFile = file;
}

MarkerEditingBar.prototype.loadLibrary = function() {
    // -- make server request on loading all icons 
    // -- create icons objects and render them in library
    this._mrkEdBarView.renderLibrary([]);
}

MarkerEditingBar.prototype.saveMarker = function() {}

MarkerEditingBar.prototype.cancelChanges = function() {}


export default MarkerEditingBar;
