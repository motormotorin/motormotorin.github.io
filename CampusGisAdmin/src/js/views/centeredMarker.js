export const renderMarker = () => {
    const marker = `
        <div class="centered-marker">
            <img src="../media/blue-pin-marker.svg"></img>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", marker);
}

export const clearMarker = () => {
    const marker = document.querySelector(".centered-marker");
    if (marker) marker.parentNode.removeChild(marker);
}