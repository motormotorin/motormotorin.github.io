
function AsideView() {
    this.$aside = document.querySelector(".edit-area #sidebar");
}

AsideView.prototype = {
    show: function() {
        this.$aside.style.width = "330px";
    }, 

    hide: function() {
        this.$aside.style.width = "0px";
    }
}

export default AsideView;