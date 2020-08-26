class LevelsSwitcherView {
    constructor() {
        this.$levelSwitcher = document.querySelector("#lvl-switch");
        this.$levelUp = this.$levelSwitcher.querySelector("#lvl-up");
        this.$levelDown = this.$levelSwitcher.querySelector("#lvl-down");
        this.$levelLabel = this.$levelSwitcher.querySelector("#lvl-lable");
    }

    show() {
        this.$levelSwitcher.classList.add("show");
    }

    hide() {
        this.$levelSwitcher.classList.remove("show");
    }

    setLevel(value) {
        this.$levelLabel.innerText = value;
    }
}

export default LevelsSwitcherView;
