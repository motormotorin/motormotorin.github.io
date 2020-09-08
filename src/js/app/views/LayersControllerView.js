
class LayersControllerView {
    constructor() {
        this.$layerBtn = document.querySelector("#layers-btn");
        this.$layersPanel = document.querySelector("#layers-sidebar");
    }

    showPanel() {
        this.$layersPanel.classList.add("show");
    }

    hidePanel() {
        this.$layersPanel.classList.remove("show");
    }

    addLayer(layer) {
        var layer = this.buildLayerElement(layer);
        this.renderElement(layer);
    }

    setWrapper() {
        var wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        document.querySelector(".app .main .container").insertAdjacentElement("beforeend", wrapper);
        return wrapper;
    }

    removeWrapper() {
        var wrapper = document.querySelector(".wrapper");
        if (wrapper) wrapper.parentNode.removeChild(wrapper);
    }

    

    buildLayerElement(layer) {
        return `
            <div id=${layer.id} class="sidebar__checkbox ${layer.state === "active" ? "" : "sidebar__checkbox--disabled"}">
                <div class="sidebar__btn shadow">
                    <img src="../media/icons/${layer.icon}.svg" alt="">
                </div>
                <span>${layer.title}</span>
            </div>
        `;
    }

    renderElement(element) {
        this.$layersPanel.querySelector(".sidebar__container").insertAdjacentHTML("afterbegin", element);
    }

    toggleLayerVisibility(checkboxId) {
        this.$layersPanel.querySelector(`#${checkboxId}`).classList.toggle("sidebar__checkbox--disabled");
    }
}

export default LayersControllerView;