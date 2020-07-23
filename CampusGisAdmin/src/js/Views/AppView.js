import { headerDOM as elements } from '../Util/Base';

function AppView() {
    this.selectorsList = document.querySelector(`.${elements.headerUl}`);
}

AppView.prototype.highlightSelected = function(id) {
    const selectors = Array.from(this.selectorsList.children); 
    const selector = selectors.find(slctr => slctr.id === id);

    selectors.forEach(slctr => {
        slctr.classList.remove(elements.headerLiActive);
    });

    selector.classList.toggle(elements.headerLiActive);
};

export default AppView;