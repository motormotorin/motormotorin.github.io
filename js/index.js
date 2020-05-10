const burgerBlock = document.querySelector('.burger');
const rightSideMenu = document.querySelector('.menu');

const optionMenu = document.querySelector('.option-menu');
const arrowSVG = document.querySelector('#arrow');
const options = document.querySelectorAll('.option-item-top');

const createMessageOption = document.querySelector('#msgopt');
const creatingMessageBlock = document.querySelector('.create-message');
const sendMessageButton = document.querySelector('.send-btn button');
const textArea = document.querySelector('#mess');
const messageLength = document.querySelector('.message-length');

var marker = document.querySelector('.centered-marker');

var openedElements = [];

function toggleRightSideMenu() {
    [rightSideMenu, ...burgerBlock.children].forEach(el => el.classList.toggle('open'));
}

function toggleOptionMenu() {
    if (optionMenu.classList.contains('open')) {
        options.forEach(el => { 
            el.style.top = '0px'; 
        });
        arrowSVG.parentElement.classList.remove('rotate');
        optionMenu.style.height = '70px';
        optionMenu.classList.remove('open');
    } else {
        optionMenu.classList.add('open');
        optionMenu.style.height = `${70 + options.length * 40}px`;
        arrowSVG.parentElement.classList.add('rotate');
        options.forEach((el, index) => { 
            el.style.top = `${(index + 1) * 40}px`; 
        });

    }
}

function addCenteredMarker() {
    const imgEl = document.createElement('img');
    imgEl.classList.add('pin-marker');
    imgEl.src = './media/icons/blue-pin-msg.svg';
    marker.appendChild(imgEl);
}

function opencreatingMessageBlock() {
    creatingMessageBlock.style.transform = 'translate(-50%, 0%)';
    creatingMessageBlock.classList.add('active');
}

function removeCenteredMarker() {
    marker.innerHTML = '';
}

function initMapListeners() {
    map.on('click', destroyMessageInterface);
}

function initMessageInterface() {
    addCenteredMarker();
    opencreatingMessageBlock();
    initMapListeners();
}

function removeMapListeners() {
    map.off('click', destroyMessageInterface);
}

function closecreatingMessageBlock() {
    creatingMessageBlock.style.transform = 'translate(-50%, calc(100% + 20px))';
    creatingMessageBlock.classList.remove('active');
}

function cleancreatingMessageBlock() {
    textArea.value = '';
    messageLength.innerText = 0;
    messageLength.style.display = 'none';
    sendMessageButton.disabled = true;
}

function destroyMessageInterface() {
    closecreatingMessageBlock();
    cleancreatingMessageBlock();
    removeCenteredMarker();
    removeMapListeners();
}

var _mesId = 0;
function openMessage() {  // should be bind with object included mess and date
    closeMessage();

    const messageHTML = `
        <div id="mess-${_mesId}" class="message shadow">
            <div id="mess-close-${_mesId}"class="close-btn"></div>
            <div class="text-cont">
                <div class="message-text">
                    <p>${this.mess}</p>
                </div>
                <div class="message-date">
                    <p>${this.date}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageHTML);
    document.querySelector(`#mess-close-${_mesId}`).addEventListener('click', () => {
        closeMessage();
    });

    setTimeout(() => {
        document.querySelector(`#mess-${_mesId}`).style.transform = 'translate(-50%, 0%)';
        _mesId++;
    }, 100);
}

function closeMessage() {
    let elem = document.querySelector(`#mess-${_mesId - 1}`);
    if (elem) {
        elem.style.backgroundColor = 'rgb(216, 216, 216)';
        elem.style.transform = 'translate(-50%, calc(100% + 50px))';
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 300);
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? matches : undefined;
}

function setCookieTimer() {
    let now = new Date();
    let newTime = new Date(now.getTime() + 5*60000);
    document.cookie = `_msgtimer=true; path=/; expires=${newTime.toUTCString()}`;
}

sendMessageButton.addEventListener('click', () => {
    
    if (textArea.value.replace(/\s/g, '').length) {
        if (!getCookie('_msgtimer')) {
            sendMessageButton.setAttribute('disabled', true);
            sendMessageButton.classList.add('state-1');

            const JSONdata = JSON.stringify({ 
                Date: new Date(),
                latlng: map.getCenter(),
                mess: textArea.value
            });

            setTimeout(() => {
                $.ajax({
                    type: "POST",
                    url: "bot.php",
                    data: {request:JSONdata},
                    success: function(res) {
                        sendMessageButton.classList.add('state-2');
                        setTimeout(() => {
                            sendMessageButton.classList.remove('state-1', 'state-2');
                            setTimeout(() => {
                                destroyMessageInterface();
                            }, 300);
                        }, 1500);
                        setCookieTimer();
                    },
                    error: () => {
                        sendMessageButton.lastElementChild.innerText = 'Failed!';
                        sendMessageButton.classList.add('state-2');               
                        setTimeout(() =>  {
                            sendMessageButton.classList.remove('state-1', 'state-2');      
                            sendMessageButton.disabled = false;
                            setTimeout(() => {
                                sendMessageButton.lastElementChild.innerText = 'Done!'
                            }, 300);
                        }, 1500);
                    }
                }); 
            }, 1000);
        } else {
            alert('Отправка сообщений временно недоступна');
        }
    }
});

textArea.addEventListener('input', () => {
    const maxLength = 100;
    let length = textArea.value.length;
    sendMessageButton.disabled = textArea.value.replace(/\s/g, '').length ? false : true;

    if (length >= 1) {
        if (length >= maxLength) {
            textArea.value = textArea.value.substring(0, maxLength-1);
        }
        messageLength.style.display = 'inline';
        messageLength.innerText = `${length}/${maxLength}`;
    } else {
        messageLength.style.display = 'none';
    }
});

createMessageOption.addEventListener('click', () => {
    if (!creatingMessageBlock.classList.contains('active')) {
        toggleOptionMenu();
        initMessageInterface();  
    }
});

arrowSVG.addEventListener('click', () => toggleOptionMenu());
burgerBlock.addEventListener('click', () => toggleRightSideMenu());

$(window).on('load', () => {
    let $preloader = $('.preloader');	
    $preloader.delay(1000).fadeOut('slow', function() {
        $(this).remove();
    });
});