import Evt from '../../Util/Event';
import HeaderView from '../views/HeaderView';
import generateUniqueId from '../../Util/generateUniqueId';

function Header() {
    this.view = new HeaderView();

    this.selectTypeEvent = new Evt(this);

    this.setupHandlers();
}

Header.prototype = {
    setupHandlers: function() {
        ["mouseover", "mouseout"].forEach(event => {
            this.view.$layersBtn.addEventListener(event, (e) => {
                this.view.toggleMenuVisibility(this.view.$layersBtn, e.type);
            });
            this.view.$buildingBtn.addEventListener(event, (e) => {
                this.view.toggleMenuVisibility(this.view.$buildingBtn, e.type)
            })
        });

        this.view.$layersBtn.addEventListener("click", (e) => {
            var element = e.target.closest(".toolbar-group-item");
            if (element) {
                this.selectType("layer", element.id);
            }
        });

        this.view.$buildingBtn.addEventListener("change", (e) => {
            const url = URL.createObjectURL(e.target.files[0]);
            this.selectType("building", undefined, url);
        });

        return this;
    },

    setLayers: function(layers) {
        this.view.renderLayersMenu(layers);
    },
 
    selectType: function(type, selectorId, arg) {
        this.selectTypeEvent.notify(type, selectorId, arg);
    },
}




export default Header;