

function HeaderView() {
    this._setupDomElements();
}

HeaderView.prototype = {
    _setupDomElements: function() {

        this.$toolbar = document.querySelector(".toolbar");
        this.$buildingBtn = this.$toolbar.querySelector("#building-btn");
        this.$layersBtn = this.$toolbar.querySelector(".place-submenu");
        this.$removeBtn = this.$toolbar.querySelector("#remove-btn");
        this.$saveBtn = this.$toolbar.querySelector("#save-button");

        return this;
    },

    renderLayersMenu: function(placeElements) {
        const menu = this.$layersBtn.querySelector("menu");
        placeElements = this._sortElementsByPropsValue(placeElements, "title");

        placeElements.forEach(element => {
            const elementHtml = this._createLayerItemHTML(element);
            menu.insertAdjacentHTML("beforeend", elementHtml);
        });
    },

    toggleMenuVisibility: function(element, eventType) {
        switch(eventType) {
            case "mouseover": 
                element.querySelector("menu").style.display = "block";
                break;
            case "mouseout":
                element.querySelector("menu").style.display = "none";
                break;
        }
    },

    _sortElementsByPropsValue: function(elements, property) {
        return elements.sort((a, b) => {
            return ((a[property][0] < b[property][0]) ? -1 : ((a[property][0] > b[property][0]) ? 1 : 0));
        });
    },

    _createLayerItemHTML: function(element) {
        const html = `
            <div id="${element.id}" class="toolbar-group-item">
                <div class="item-container">
                    <span class="item-title">${element.title}</span>
                </div>        
            </div>`;
        return html;
    },
}

export default HeaderView;