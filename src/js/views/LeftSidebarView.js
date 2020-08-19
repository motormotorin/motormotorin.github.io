
function LeftSidebarView() {
    this.$layersSidebar = document.querySelector(".app #layers-sidebar");
}

LeftSidebarView.prototype = {
    renderLayerItem: function(layer) {
        const layerItemHTML = `
            <div id="${layer.id}" class="layer-checkbox">
                <div class="layer-checkbox__btn ${layer.state === "disable" ? "layer-checkbox__btn--disabled" : ""} shadow">
                    <img src="${layer.icon}" alt="">
                </div>
                <span class="layer-checkbox__span">${layer.title}</span>
            </div>
        `;

        this.$layersSidebar.querySelector(".sidebar__container")
            .insertAdjacentHTML("beforeend", layerItemHTML);
    },

    addWrapper: function() {
        const newElement = `<div class="wrapper"></div>`
        document.querySelector("body")
          .insertAdjacentHTML("afterbegin", newElement);
    },

    removeWrapper: function() {
        document.querySelector("body")
            .removeChild(document.querySelector(".wrapper"));
    },

    open: function() {
        this.$layersSidebar.classList.add("show");
    },

    close: function() {
        this.$layersSidebar.classList.remove("show");
    },

    toggleDisabling: function(layerId) {
        const layer = this.$layersSidebar.querySelector(`#${layerId}`);
        const layerBtn = layer.querySelector(".layer-checkbox__btn");
        layerBtn.classList.toggle("layer-checkbox__btn--disabled");
    }
}

export default LeftSidebarView;