export const elements = {
    sidebarSelector: document.querySelector('.sidebar-selector'),
    sidebarContainer: document.querySelector('.sidebar-container'),
    layersToolbar: document.querySelector('.layers-toolbar'),
    structureToolbar: document.querySelector('.structure-toolbar'),
    layersContainer: document.querySelector('.layers-container'),
    structureContainer: document.querySelector('.structure-container'),
    rightSidebar: document.querySelector('.right-sidebar')
}

export const status = {
    editing: "editing",
    watching: "watching",
    creating: "creating"
}

export const layerStatus = {
    new: "new",
    old: "old",
    modified: "modified"
}

export const selectors = {
    layers: "layers",
    buildings: "buildings"
}

export const elementsStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="loader"></div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`);
    if (loader) loader.parentNode.removeChild(loader);
}