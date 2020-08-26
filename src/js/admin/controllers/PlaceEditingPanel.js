import PlaceEditingPanelView from '../views/PlaceEditingPanelView';
import Evt from '../../Util/Event';

function PlaceEditingPanel() {
    this.place;
    this.layerId;
    this.view = new PlaceEditingPanelView();

    this.changePlaceIconEvent = new Evt(this);

    this.setupHandlers();
    this.hide();
}

PlaceEditingPanel.prototype = {
    setupHandlers: function() {

        this.view.$placeEditingPanel.addEventListener("change", (e) => {
            this.setValueFromInputs(e.target.id, e.target.value);
        });
    
        this.view.$worktimeField.addEventListener("click", (e) => {
            if (e.target.closest(`.worktime-field__day`)) {            
                if (e.ctrlKey) {
                    this.view.insertWorktime();
                    this.view.highlightSelectedDay(e.target.id, true);
                    
                } else {
                    this.view.isDaySelect(e.target.id) 
                        ? this.view.insertWorktime()
                        : this.view.insertWorktime(this.place.worktime[e.target.id]);
                    this.view.highlightSelectedDay(e.target.id, false);
                }  
            }       
        });
    
        this.view.$worktimeField.addEventListener("change", (e) => {
            e.stopPropagation();
            this.setWorktime(e.target.value);
        });
    
        this.view.$iconsLib.addEventListener("click", (e) => {
            if (e.target.id === 'select-from-library') {
                this.loadLibrary();
    
            } else if (e.target.closest(`.icons-library__item`)) {
                const icon = e.target.closest(`.icons-library__item`).id;
                this.setPlaceIcon(icon); 
    
            } else if (e.target.closest(`.selected-icon__unselect-icon`)) {
                this.setPlaceIcon(""); 
            }
        });
    
        this.view.$imageForm.addEventListener("change", (e) => {
            e.stopPropagation();
            const file = e.target.files[0];    
            this.setPlaceImage(file);
        });

        this.view.$deleteImgBtn.addEventListener("click", (e) => {
            this.setPlaceImage("");
        });
    },

    show: function() {
        this.view.show();
    },

    hide: function() {
        this.view.hide();
    },

    setPlace: function(layerId, place) {
        this.clearAll();

        this.place = place;
        this.layerId = layerId;
    
        this.show();
        this.view.setInfoInInputs(this.place);
        this.view.renderSelectedIcon(this.place.icon);
        this.view.renderImagePreview(this.place.image);
    },

    setValueFromInputs: function(prop, value) {
        if (this.place.hasOwnProperty(prop)) this.place[prop] = value;
    },

    setWorktime: function(worktime) {
        this.view.getSelectedDaysId().forEach(day => {
            this.place.worktime[day] = worktime;
        });
    },

    setPlaceIcon: function(icon) {
        this.place.icon = icon;
        this.view.renderSelectedIcon(icon);
        this.view.hideLibrary();

        this.changePlaceIconEvent.notify(this.layerId, this.place.id, icon);
    },

    setPlaceImage: function(file) {
        if (file) {
            this.place.image = file;
            this.view.renderImagePreview(file);
        } else {
            this.place.image = undefined;
            this.view.clearImagePreview();
        }
    },

    loadLibrary: function() {
        // const iconsNames = ["card", "bank", "camera", "coffee", "coworking",
        //     "canteen", "mail", "pharmacy", "scissors", "market", "printer", "hospital",
        //     "washing-mashine"];
        const iconsNames = ["atm_sber", "atm_gpb", "giftshop", "gpbank", "sber", "sens"];

        this.view.clearLibrary();
        this.view.renderLibrary(iconsNames);
    },

    clearAll: function() {
        this.place = undefined;
        this.layerId = undefined;
        this.view.clearAll();
    },

    close: function() {
        this.hide();
        this.clearAll();
    }
}

export default PlaceEditingPanel;
