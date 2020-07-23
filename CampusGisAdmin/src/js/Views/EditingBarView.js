import { editorBarDOM as elements } from '../Util/Base';

function EditingBarView() {
    this.editorBar = document.querySelector(`.${elements.editorBar}`);
    this.show();
}

EditingBarView.prototype.show = function() {
    this.editorBar.style.transform = "translateX(0%)";
}

EditingBarView.prototype.hide = function() {
    this.editorBar.style.transform = "translateX(-100%)";
}

EditingBarView.prototype.highlightSelected = function(id) {
    this.editorBar.querySelectorAll(`.${elements.selectorLi}`)
    .forEach(slctr => {
        slctr.id === id 
            ? slctr.classList.add(elements.selectorLiActive) 
            : slctr.classList.remove(elements.selectorLiActive);
    });
}

export default EditingBarView;