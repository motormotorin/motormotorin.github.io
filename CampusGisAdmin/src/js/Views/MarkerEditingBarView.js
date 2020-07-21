import { MarkerEditingBarDOMs as elements }  from '../Util/Base';
import Marker from '../Models/Marker';

function MarkerEditingBarView() {
    this.init();
    this.show();
};

MarkerEditingBarView.prototype.init = function() {
    this.markerEditingBar = document.querySelector(`#${elements.markerEditingBarID}`);
    this.changesApplyBlock = this.markerEditingBar.querySelector(`.${elements.changesApply}`);
    this.worktimeField = this.markerEditingBar.querySelector(`.${elements.worktimeField}`)
    this.iconsLib = this.markerEditingBar.querySelector(`.${elements.iconsLib}`);
    this.imageForm = this.markerEditingBar.querySelector(`.${elements.imageForm}`);
}

MarkerEditingBarView.prototype.show = function() {
    this.markerEditingBar.style.transform = "translateX(0%)";
}

MarkerEditingBarView.prototype.hide = function() {
    this.markerEditingBar.style.transform = "translateX(-100%)";
}

MarkerEditingBarView.prototype.setInfoInInputs = function(marker) {
    const inputs = this.markerEditingBar.querySelectorAll("input");
    inputs.forEach(input => {
        (marker.hasOwnProperty(input.id) && typeof marker[input.id] !== "object") 
            ? input.value = marker[input.id]
            : undefined;
    });
}

MarkerEditingBarView.prototype.highlightSelectedDay = function(id, few = false) {
    const daysArray = Array.from(this.worktimeField.querySelectorAll(`.${elements.worktimeDay}`));
    if (few === false) {
        daysArray.forEach(chld => {
            if (chld.id !== id) 
                chld.classList.remove(elements.worktimeActiveDay);
        });
    }
    daysArray.find(chld => chld.id === id).classList.toggle(elements.worktimeActiveDay);
}

MarkerEditingBarView.prototype.isDaySelect = function(id) {
    const dayElem = this.worktimeField.querySelector(`#${id}`);
    return (dayElem && dayElem.classList.contains(elements.worktimeActiveDay));
}

MarkerEditingBarView.prototype.getSelectedDaysId = function() {
    const daysArray = Array.from(this.worktimeField.querySelectorAll(`.${elements.worktimeDay}`));
    var ids = [];

    daysArray.forEach(day => {
        day.classList.contains(elements.worktimeActiveDay) 
            ? ids.push(day.id) 
            : undefined;
    });
    return ids; 
}

MarkerEditingBarView.prototype.insertWorktime = function(text) {
    const input = this.worktimeField.querySelector('input');
    input.value = text || "";
}

MarkerEditingBarView.prototype.createLibraryIcon = function(element) {
    const libraryIconHTML = `
        <div id="${element.id}" class="${elements.iconsLibItem}">
            <img src="media/${element.imgName}.svg" alt="">
        </div>
    `;
    return libraryIconHTML;
}

MarkerEditingBarView.prototype.renderLibrary = function() {
    const libCont = this.iconsLib.querySelector(`.${elements.iconsLibContainer}`);
    libCont.style.height = "200px";
}

MarkerEditingBarView.prototype.clearLibrary = function() {
    const libCont = this.iconsLib.querySelector(`.${elements.iconsLibContainer}`);
    libCont.innerHTML = "";
}

MarkerEditingBarView.prototype.hideLibrary = function() {
    const libCont = this.iconsLib.querySelector(`.${elements.iconsLibContainer}`);
    libCont.style.height = "0px";
}

MarkerEditingBarView.prototype.clearSelectedIcon = function() {
    this.iconsLib.querySelectorAll(`.selected-icon`).forEach(item => {
        item.parentElement.removeChild(item);
    });
}

MarkerEditingBarView.prototype.renderSelectedIcon = function(name) {
    const selectedIconHTML = `
        <div class="selected-icon">
            <div class="icons-library__item icons-library__item--active">
                <img src="media/file.svg" alt="">
            </div>
            <span class="selected-icon__icon-name">library</span>
            <img class="selected-icon__unselect-icon" src="media/add.svg" alt="" style="transform: rotate(45deg)">
        </div>
    `;
    this.clearSelectedIcon();
    this.iconsLib.insertAdjacentHTML("afterbegin", selectedIconHTML);
}

MarkerEditingBarView.prototype.renderImagePreview = function(img) {
    const image = this.imageForm.querySelector("img");

    if (typeof img === "object") {
        const src = URL.createObjectURL(img);
        image.src = src;
    } else {
        // -- set image src 
    }
}

MarkerEditingBarView.prototype.clearAll = function() {

}


export default MarkerEditingBarView;