import { highlightSelectedLayer } from "./layersContainerView";

export const highlightSelected = (id) => {
    var layersBtn = document.querySelector("#layers-slctr");
    var buildingsBtn = document.querySelector("#buildings-slctr");

    if (id === "layers-slctr") {
        layersBtn.classList.contains('active') ? null : layersBtn.classList.add('active');
        buildingsBtn.classList.contains('active') ? buildingsBtn.classList.remove('active') : null;
    } else if (id === "buildings-slctr") {
        layersBtn.classList.contains('active') ? layersBtn.classList.remove('active') : null;
        buildingsBtn.classList.contains('active') ? null : buildingsBtn.classList.add('active');
    }
}