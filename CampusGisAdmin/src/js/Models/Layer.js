function generateUniqueId(prefix) {
    return prefix + "_" + Math.random().toString(36).substr(2,9);
}

function Layer(layer = {}) {
    this.title = layer.title || "";
    this.id = layer.id || generateUniqueId("layer");
    this.elements = layer.elements || [];
    this.state = layer.state || "new";
}

export default Layer;
