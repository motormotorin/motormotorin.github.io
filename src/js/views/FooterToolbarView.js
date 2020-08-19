
function FooterToolbarView() {
    this.$footerToolbar = document.querySelector(".footer-toolbar");
    this.$options = this.$footerToolbar.querySelectorAll(".navigation__item");
}

FooterToolbarView.prototype = {
    highlightSelected: function(item) {
        this.$options.forEach(option => option.classList.remove("active"));
        item.classList.add("active");
    },

    show: function() {
        this.$footerToolbar.classList.remove("hide");
    },

    hide: function() {
        this.$footerToolbar.classList.add("hide");
    }
}

export default FooterToolbarView;