import { elements } from './base';

const initObject = (obj) => {
    if (obj !== {} && obj !== null && obj !== undefined) {
        return obj;
    } else {
        return {
            name: "",
            description: "",
            worktime: {
                weekdays: "",
                weekends: ""
            },
            address: {
                level: "",
                building: ""
            }
        }
    }
}

export const clearSidebar = () => {
    elements.rightSidebar.style.transform = "translateX(100%)";
    elements.rightSidebar.innerHTML = "";
}

export const renderSidebar = (marker = null) => {
    const obj = initObject(marker);
    const structElemInfoHTML = `
        <div class="data-cont">
            <div class="line">
                <label for="">Name</label>
                <input type="text" id="name" value="${obj.name}">
            </div>
            <div class="line">
                <label for="">Description</label>
                <input type="text" id="description" value="${obj.description}">
            </div>
            <div class="main-line">Worktime</div>
            <div class="line">
                <label for="">Weekdays</label>
                <input type="text" id="weekdays" value="${obj.worktime.weekdays}">
            </div>
            <div class="line">
                <label for="">Weekends</label>
                <input type="text" id="weekends" value="${obj.worktime.weekends}">
            </div>
            <div class="main-line">Address</div>
            <div class="line">
                <label for="">Building</label>
                <input type="text" id="building" value="${obj.address.building}">
            </div>
            <div class="line">
                <label for="">Level</label>
                <input type="text" id="level" value="${obj.address.level}">
            </div>
            <div class="main-line">Marker icon</div>
            <div class="line">
                <label for="">Icon</label>
                <input type="file" id="file">
            </div>
            <div class="buttons-line">
                <button id="save-changes">Add</button>
                <button id="cancel-changes">Cancel</button>
            </div>
        </div>
    `;

    elements.rightSidebar.style.transform = "translateX(0%)";
    elements.rightSidebar.insertAdjacentHTML("afterbegin", structElemInfoHTML);
}