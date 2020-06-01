import { elements, renderLoader, clearLoader, 
         status, selectors, layerStatus } from './views/base';

//MODELS
import SelectorSearch from './models/SelectorSearch';
import Layer from './models/Layer';

//VIEWS
import * as layersContainerView from './views/layersContainerView';
import * as selectorSearchView from './views/selectorSearchView';
import * as structureContainerView from './views/structureContainerView';
import * as rightSidebarView from './views/rightSidebarView';
import * as centeredMarker from './views/centeredMarker';

//MAP INITIALIZATION
var map = L.map('mapid')
    .setView([43.02825898949743, 131.89296126365664], 13)
    .setMaxBounds([[43.050952, 131.85915],[42.994509, 131.94232]]);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 15,
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);


const state = {
    status: "watching",
    layers: [],
    currentDataType: null,
    currentLayer: {},  
};


// TOGGLE FUNCTIONS
 
const toggleStructureContainer = (e) => {
    let element = e.target.closest("#structure-acrd");
    if (element.classList.contains("show")) {
        element.classList.replace("show", "hide");
        element.querySelector("img").style.transform = "rotate(0deg)";
        elements.structureContainer.style.cssText = "flex-grow: 0; height: 0px;";
    } else if (element.classList.contains("hide")) {
        element.classList.replace("hide", "show");
        element.querySelector("img").style.transform = "rotate(90deg)";
        elements.structureContainer.style.flexGrow = "1";
    }
}

const toggleLayersContainer = (e) => {
    let element = e.target.closest("#layers-acrd");
    if (element.classList.contains("show")) {
        element.classList.replace("show", "hide");
        element.querySelector("img").style.transform = "rotate(0deg)";
        elements.layersContainer.style.height = "0px";
    } else if (element.classList.contains("hide")) {
        element.classList.replace("hide", "show");
        element.querySelector("img").style.transform = "rotate(90deg)";
        elements.layersContainer.style.height = "150px";
    }
}




const selectorController = async (e) => {
    if (e.target.id === 'layers-slctr') {
        state.currentDataType = selectors.layers;       

    } else if (e.target.id === 'buildings-slctr') {
        state.currentDataType = selectors.buildings;
    }

    selectorSearchView.highlightSelected(e.target.id);
    if (state.currentDataType) {
        layersContainerView.clearContainer();
        structureContainerView.clearContainer();
        renderLoader(elements.layersContainer);
        
        try {
            state.layers = await new SelectorSearch(state.currentDataType).getLayers();   
            clearLoader();
            state.layers.forEach(layer => {
                layersContainerView.renderLayer(layer);
            });

        } catch (error) {
            console.log(error);
            alert("Ну и что ты делаешь?");
        }
    }
}

elements.sidebarSelector.addEventListener('click', (e) => {
    selectorController(e);
});

elements.layersToolbar.addEventListener('click', (e) => {
    if (e.target.closest("#layers-acrd")) {
        toggleLayersContainer(e);

    } else if (e.target.closest("#add-layer") && state.currentDataType) {
        console.log(state);
        if (state.currentDataType === selectors.layers) {
            const layer = new Layer();
            state.layers.push(layer);

            layersContainerView.renderLayer(layer);
            layersContainerView.highlightSelectedLayer(layer.id);
            structureContainerView.clearContainer();

            state.currentLayer = layer;
        }
    } else if (e.target.closest("#del-layer")) {

    }
});

elements.layersContainer.addEventListener("dblclick", (e) => {
    const target = e.target.closest("input");
    target ? target.disabled = false : null;
});

elements.layersContainer.addEventListener("change", (e) => {
    const target = e.target.closest("input");
    target ? target.disabled = true : null;
});




const structureContainerController = (id) => {
    structureContainerView.clearContainer();
    
    state.currentLayer = state.layers.find(layer => layer.id === id);

    state.currentLayer.markers.forEach(element => {
        structureContainerView.renderElement(element);
    });

    // -- delete geojson features 
    // -- render geojson feature  
}

elements.layersContainer.addEventListener('click', (e) => {
    var row = e.target.closest('.layer-row');
    if (row) {
        layersContainerView.highlightSelectedLayer(row.id);
        structureContainerController(row.id);
    }
});

elements.structureToolbar.addEventListener('click', (e) => {
    if (e.target.closest("#structure-acrd")) {
        toggleStructureContainer(e);

    } else if (e.target.closest("#add-struct") && state.status === status.watching && state.currentLayer) {
        const element = {
            name: "",
            id: "id" + (new Date().getTime()).toString()
        };

        state.status = status.creating;
        state.newElementId = element.id;
        centeredMarker.renderMarker();

        structureContainerView.renderElement(element);
        structureContainerView.highlightSelectedStructElem(element.id);

        rightSidebarView.clearSidebar();
        rightSidebarView.renderSidebar();

    } else if (e.target.closest("#del-struct")) {

        // -- get active/higlight layer id 
        // -- database request on deleting layer
        // -- on success delete repeat call search controller to load structure again 
        // -- else get error message
    }
});

elements.structureContainer.addEventListener('click', (e) => {  
    const structElement = e.target.closest('.struct-row');

    if (structElement && state.currentDataType === selectors.layers) {
        structureContainerView.highlightSelectedStructElem(structElement.id);

        const marker = state.currentLayer.markers.find(m => m.id === structElement.id);
        map.setView(marker.coords);

        if (e.target.closest('#edit')) {
            state.status = status.changing;

            rightSidebarView.clearSidebar();
            rightSidebarView.renderSidebar(marker);
        }
    }
});




elements.rightSidebar.addEventListener("click", (e) => {
    if (e.target.closest("#cancel-changes")) {
        rightSidebarView.clearSidebar();
        centeredMarker.clearMarker();
        state.newElementId ? structureContainerView.deleteElement(state.newElementId) : null;

        state.newElementId = null;
        state.status = status.watching;

    } else if (e.target.closest("#save-changes")) {
        
        const checkData = () => {
            const dataContainer = elements.rightSidebar.querySelector(".data-cont");
            const data = {
                name: dataContainer.querySelector("#name").value, 
                description:  dataContainer.querySelector("#description").value,
                weekdays: dataContainer.querySelector("#weekdays").value,
                weekends: dataContainer.querySelector("#weekends").value,
                building: dataContainer.querySelector("#building").value,
                level: dataContainer.querySelector("#level").value,
                icon: dataContainer.querySelector("#file").files[0]
            }

            console.log(data);
        }

        checkData();

        // -- get marker data
        // -- add new marker to layer 
        state.currentLayer.addMarker();
        // -- display new marker on map 
        // -- change "save icon" color 

    }
});

elements.rightSidebar.addEventListener("input", (e) => {

    state.currentLayer.status = layerStatus.modified;

    if (e.target.id === "name") {
        structureContainerView.insertNewName(e.target.value);
    }
});