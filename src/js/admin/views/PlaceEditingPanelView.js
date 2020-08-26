
function PlaceEditingPanelView() {
    this.$placeEditingPanel = document.querySelector(`#place-editing-panel`);
    this.$worktimeField = this.$placeEditingPanel.querySelector(`.worktime-field`);
    this.$iconsLib = this.$placeEditingPanel.querySelector(`.icons-library`);
    this.$imageForm = this.$placeEditingPanel.querySelector(`.image-form`);
    this.$deleteImgBtn = this.$imageForm.querySelector('.image-form__delete-btn');
};

PlaceEditingPanelView.prototype = {

    show: function() { this.$placeEditingPanel.style.display = "block"; },
    hide: function() { this.$placeEditingPanel.style.display = "none"; },

    setInfoInInputs: function(place) {
        var inputs = this.$placeEditingPanel.querySelectorAll("input");
        inputs.forEach(input => {
            if (place.hasOwnProperty(input.id) && typeof place[input.id] !== "object") 
                input.value = place[input.id]
        });
    },

    clearInputs: function() {
        var inputs = this.$placeEditingPanel.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = "";
            input.src = "";
        });
    },

    highlightSelectedDay: function(id, few = false) {
        var daysArray = Array.from(this.$worktimeField.querySelectorAll(`.worktime-field__day`));
        if (few === false) {
            daysArray.forEach(chld => {
                if (chld.id !== id) 
                    chld.classList.remove('worktime-field__day--active');
            });
        }
        daysArray.find(chld => chld.id === id).classList.toggle('worktime-field__day--active');
    },

    isDaySelect: function(id) {
        var dayElem = this.$worktimeField.querySelector(`#${id}`);
        return (dayElem && dayElem.classList.contains('worktime-field__day--active'));
    },

    getSelectedDaysId: function() {
        var ids = [];
        var activeDaysArray = Array.from(this.$worktimeField.querySelectorAll(`.worktime-field__day--active`));
        activeDaysArray.forEach(day => ids.push(day.id));
        return ids; 
    },

    unselectDays: function() {
        var daysArray = Array.from(this.$worktimeField.querySelectorAll(`.worktime-field__day--active`));
        daysArray.forEach(day => day.classList.remove('worktime-field__day--active'));
    },

    insertWorktime: function(text) {
        var input = this.$worktimeField.querySelector('input');
        input.value = text || "";
    },

    renderLibrary: function(icons) {
        var libCont = this.$iconsLib.querySelector(`.icons-library__container`);
        libCont.style.height = "200px";

        icons.forEach(icon => {
            var iconHTML = this._createLibraryIcon(icon);
            libCont.insertAdjacentHTML("beforeend", iconHTML);
        });
    },

    hideLibrary: function() {
        var libCont = this.$iconsLib.querySelector(`.icons-library__container`);
        libCont.style.height = "0px";
    },

    clearLibrary: function() {
        var libCont = this.$iconsLib.querySelector(`.icons-library__container`);
        libCont.innerHTML = "";
    },

    _createLibraryIcon: function(icon) {
        var libraryIconHTML = `
            <div id="${icon}" class="icons-library__item">
                <img src="media/icons/new/${icon}.svg" alt="">
            </div>
        `;
        return libraryIconHTML;
    },

    renderSelectedIcon: function(name) {
        this.clearSelectedIcon();

        if (name) {
            var selectedIconHTML = `
                <div class="selected-icon">
                    <div class="icons-library__item icons-library__item--active">
                        <img src="media/icons/new/${name}.svg" alt="">
                    </div>
                    <span class="selected-icon__icon-name">${name}</span>
                    <!--<img class="selected-icon__unselect-icon" src="media/add.svg" alt="" style="transform: rotate(45deg)">-->
                </div>
            `;
            this.$iconsLib.insertAdjacentHTML("afterbegin", selectedIconHTML);
        }
    },

    clearSelectedIcon: function() {
        this.$iconsLib.querySelectorAll(`.selected-icon`).forEach(item => {
            item.parentElement.removeChild(item);
        });
    },

    renderImagePreview: function(image) {
        var $imagePreview = this.$imageForm.querySelector(".image-form__preview");

        if (typeof image === "string") {
            $imagePreview.insertAdjacentHTML("afterbegin", 
                `<img id="place-img-preview" src="${image}" class="image-form__img">`);
            $imagePreview.style.display = "block";
        } else if (image instanceof File) {
            $imagePreview.insertAdjacentHTML("afterbegin", 
                `<img id="place-img-preview" src="${URL.createObjectURL(image)}" class="image-form__img">`);
            $imagePreview.style.display = "block";
        }
    },

    clearImagePreview: function() {
        var $imagePreview = this.$imageForm.querySelector(".image-form__preview");
        var $img = $imagePreview.querySelector('.image-form__img');

        if ($img) 
            $imagePreview.removeChild($img);
            $imagePreview.style.display = "none";
    },

    clearAll: function() {
        this.clearInputs();
        this.clearLibrary();
        this.unselectDays();
        this.clearSelectedIcon();
        this.clearImagePreview();
    }
}

export default PlaceEditingPanelView;