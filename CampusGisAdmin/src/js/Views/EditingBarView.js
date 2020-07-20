const EditingBarView = {
    DOMstrings: {
        editorBar: "left-sidebar",
        selectorLi: "selectors__li",
        selectorLiActive: "selectors__li--active",
        layerSelectorID: "layers-slctr",
        buildingsSelectorID: "buildings-slctr",
    }
}

EditingBarView.init = function() {
    this.editorBar = document.querySelector(`.${this.DOMstrings.editorBar}`);
    return this;
}

EditingBarView.show = function() {
    this.editorBar.style.transform = "translateX(0%)";
}

EditingBarView.hide = function() {
    this.editorBar.style.transform = "translateX(-100%)";
}

EditingBarView.highlightSelected = function(id) {
    this.editorBar.querySelectorAll(`.${this.DOMstrings.selectorLi}`).forEach(slctr => {
        slctr.id === id ? slctr.classList.add(this.DOMstrings.selectorLiActive) 
            : slctr.classList.remove(this.DOMstrings.selectorLiActive);
    });
}

export default EditingBarView;