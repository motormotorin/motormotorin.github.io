import FooterToolbarView from '../views/FooterToolbarView';
import Evt from '../Util/Event';

function FooterToolbar() {
    this.view = new FooterToolbarView();

    this.selectOptionEvent = new Evt();

    this.enable();
}

FooterToolbar.prototype = {
    enable: function() {
        this.view.$footerToolbar.addEventListener("click", (e) => {
            e.stopPropagation();
            const item = e.target.closest(".navigation__item");

            if (item) {
                this.selectItem(item.id);
                this.view.highlightSelected(item);
            }
        });

    },

    selectItem: function(itemId) {
        this.selectOptionEvent.notify(itemId);
    },

    show: function() {
        this.view.show();
    },

    hide: function() {
        this.view.hide();
    }
}


export default FooterToolbar;

