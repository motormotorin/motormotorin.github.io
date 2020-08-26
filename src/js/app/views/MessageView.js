
class MessageView {
    constructor() {
        this.$messageBtn = document.querySelector(".btns-group #message-btn");
    }

    createMsgBlockHTML() {
        var messageBlockHTML = `
            <div class="message-block">
                <div class="message-block__container shadow">
                    <div class="writable-message">
                        <textarea name="mess" 
                            id="mess" 
                            onlyread="false" 
                            placeholder="Введите сообщение" 
                            maxlength="110" 
                            cols="30" rows="1"></textarea>
                        <div class="user-btn user-btn--small shadow">
                            <img src="../../media/main/message.svg" alt="">
                        </div>
                    </div>
                </div>
            </div>`;

        return messageBlockHTML;
    }

    async renderMsgBlock(html) {
        await document.querySelector(".app .main .container")
            .insertAdjacentHTML("beforeend", html);
        
        this.$messageBlock = document.querySelector(".message-block");
        this.$sendMessageBtn = this.$messageBlock.querySelector(".user-btn");
        
        setTimeout(() => {
            this.$messageBlock.classList.add("show");
        }, 100);
    }

    removeMsgBlock() {
        try {
            this.$messageBlock.classList.remove("show");

            setTimeout(() => {
                this.$messageBlock.parentNode.removeChild(this.$messageBlock);
                this.$messageBlock = undefined;
                this.$sendMessageBtn = undefined;
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



export default MessageView;