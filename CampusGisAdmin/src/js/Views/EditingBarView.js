import { editorBarDOM } from '../Util/Base';

const EditingBarView = {}

EditingBarView.init = function() {
    this.editorBar = document.querySelector(`.${editorBarDOM.editorBar}`);
    return this;
}

EditingBarView.show = function() {
    this.editorBar.style.transform = "translateX(0%)";
}

EditingBarView.hide = function() {
    this.editorBar.style.transform = "translateX(-100%)";
}

EditingBarView.highlightSelected = function(id) {
    this.editorBar.querySelectorAll(`.${editorBarDOM.selectorLi}`).forEach(slctr => {
        slctr.id === id ? slctr.classList.add(editorBarDOM.selectorLiActive) 
            : slctr.classList.remove(editorBarDOM.selectorLiActive);
    });
}

export default EditingBarView;