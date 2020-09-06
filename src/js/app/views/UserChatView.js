import messageIcon from '../../../media/main/message.svg';

class UseChatView {
    constructor() {
        this.$messageBtn = document.querySelector(".btns-group #message-btn");
    }

    buildMessageBlock() {
        this.$messageBlock = this.createMessageBlock();
        this.$messageBlock.innerHTML = this.fillMessageBlock();
        this.render();
    }

    createMessageBlock() {
        var messageBlock = document.createElement("div");
        messageBlock.classList.add("message-block");
        return messageBlock;
    }

    fillMessageBlock() {
        return `
            <div class="message-block__container shadow">
                <div class="writable-message">
                    <textarea name="mess" 
                        id="mess" 
                        onlyread="false" 
                        placeholder="Введите сообщение" 
                        maxlength="110" 
                        cols="30" rows="1"></textarea>
                    <div id="send-btn" class="user-btn user-btn--small shadow">
                        <img src="${messageIcon}" alt="">
                    </div>
                </div>
            </div>`;
    }

    render() {
        document.querySelector(".app .main .container").insertAdjacentElement("beforeend", this.$messageBlock);
        this.$messageBlock.classList.add("show");
    }

    removeMessageBlock() {
        try {
            this.$messageBlock.classList.remove("show");

            setTimeout(() => {
                this.$messageBlock.parentNode.removeChild(this.$messageBlock);
            }, 300);

        } catch(e) {
            console.error(e);
        }
    }

    getValuerFromInput() {
        return this.$messageBlock.querySelector("textarea").value;
    }

    showMarker() {
        this.$centeredMarker = document.querySelector(".centered-marker");
        this.$centeredMarker.classList.add("show");
    }

    hideMarker() {
        this.$centeredMarker.classList.remove("show");
        this.$centeredMarker = undefined;
    }

}



export default UseChatView;