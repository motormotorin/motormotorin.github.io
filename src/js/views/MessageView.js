import MessageIcon from '../../media/main/message.svg';

function MessageView() {
    this.$messageBlock;
    this.$sendMessageBtn;
    this.$centeredMarker;
}

MessageView.prototype = {
    renderMessageBlock: async function() {
        const messageBlockHTML = `
            <div class="message-block">
                <div class="message-block__container">
                    <div class="writable-message shadow">
                        <div class="writable-message__text-field">
                            <textarea name="mess" id="mess" onlyread="false" placeholder="Введите сообщение" maxlength="110" cols="30" rows="1"></textarea>
                        </div>
                        <div class="writable-message__send-btn">
                            <img src="${MessageIcon}" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `;

        await document.querySelector(".app .main .map-container")
            .insertAdjacentHTML("beforeend", messageBlockHTML);
        
        this.$messageBlock = document.querySelector(".message-block");
        this.$sendMessageBtn = this.$messageBlock.querySelector(".writable-message__send-btn");
        
        setTimeout(() => {
            this.$messageBlock.classList.add("show");
            this._showMarker();
        }, 100);
    },

    removeMessageBlock: function() {
        if (this.$messageBlock !== undefined) {
            try {
                this.$messageBlock.classList.remove("show");

                setTimeout(() => {
                    this.$messageBlock.parentNode.removeChild(this.$messageBlock);
                    this.$messageBlock = undefined;
                    this.$sendMessageBtn = undefined;
                }, 300);

                this._hideMarker();

            } catch(e) {
                console.error(e);
            }
        }
    },

    getValuerFromInput: function() {
        return this.$messageBlock.querySelector("textarea").value;
    },

    _showMarker: function() {
        this.$centeredMarker = document.querySelector(".centered-marker");
        this.$centeredMarker.classList.add("show");
    },

    _hideMarker: function() {
        this.$centeredMarker.classList.remove("show");
        this.$centeredMarker = undefined;
    }
}

export default MessageView;