import DescriptionsView from "../views/DescriptionView";

class Description {
    constructor(description) {        
        this.description = description;

        this.$description = DescriptionsView.buildDescription(description);
        DescriptionsView.renderDescription(this.$description);

        this.enableDescription();
    } 

    enableDescription() {
        this.$description.querySelector(".description__card").addEventListener("click", (e) => {
            e.stopPropagation();
        });

        this.$description.querySelector("ul").addEventListener("click", (e) => {
            if (e.target.id) {
                DescriptionsView.changeWorktime(this.$description, this.description, e.target.id);
            }
        });

        this.clickHandler = this.remove.bind(this);
        setTimeout(() => document.addEventListener("click", this.clickHandler, {once: true}), 50);

        return this;
    }

    remove(e) {
        DescriptionsView.removeDescription(this.$description);   
        e.preventDefault();
    }
}

class DescriptionsPrinter {
    constructor() {
        this.descriptions = [];
    }

    printDescription(description) {
        // this.descriptions.forEach(des => {
        //     des.remove();
        // });

        this.descriptions = [];
        this.descriptions.push(new Description(description));
    }

}

export default DescriptionsPrinter;