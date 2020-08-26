
function LayersSidebarView() {
    this.$layersBtn = document.querySelector('#layers-btn');
    this.$layersSidebar = document.querySelector(".sidebar");
}

LayersSidebarView.prototype = {
    show: function() {
        this.$layersSidebar.classList.add("show");
    },

    hide: function() {
        this.$layersSidebar.classList.remove("show");
    },

    createLayerHTML: function(layer) {
        var layerHTML =  `
            <div id="${layer.id}" class="sidebar__checkbox ${layer.isDisabled ? "sidebar__btn--disabled" : ""}">
                <div class="user-btn user-btn--big shadow">
                    <img src="../media/layers/building.svg" alt="">
                </div>
                <span>${layer.title}</span>
            </div>
        `;
        return layerHTML;
    },

    renderLayer: function(html) {
        this.$layersSidebar.querySelector(".sidebar__container")
            .insertAdjacentHTML("beforeend", html);
    },

    createWrapperHTML: function() {
        var wrapperHTML = `<div class="wrapper"></div>`;
        return wrapperHTML;
    },

    renderWrapper: function(html) {
        document.querySelector(".app .main").insertAdjacentHTML("afterbegin", html);
    },

    removeWrapper: function() {
        var wrapper = document.querySelector(".wrapper");
        if (wrapper) {
            wrapper.parentNode.removeChild(wrapper);
        }
    },

    toggleDisabling: function(layerId) {
        var layer = this.$layersSidebar.querySelector(`#${layerId}`);
        var layerBtn = layer.querySelector(".sidebar__btn");
        layerBtn.classList.toggle("sidebar__btn-disabled");
    }
}

export default LayersSidebarView;