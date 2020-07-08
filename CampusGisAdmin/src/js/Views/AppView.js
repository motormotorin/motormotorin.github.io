import { headerDOM } from '../Util/Base';

const AppView = {}

AppView.highlightSelected = function(id) {
    const elems = document.querySelectorAll(`.${headerDOM.headerLi}`)
    elems.forEach(elem => {
        elem.id === id ? elem.classList.add(headerDOM.headerLiActive) 
            : elem.classList.remove(headerDOM.headerLiActive);
    });
};

export default AppView;