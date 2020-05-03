const burgerBlock = document.querySelector('.open-overlay');
const rightSideMenu = document.querySelector('.menu');

const optionMenu = document.querySelector('.option-menu');
const arrowSVG = document.querySelector('#arrow');
const options = document.querySelectorAll('.option-item-top');

const messageOption = document.querySelector('#msgopt');
const messageBox = document.querySelector('.message');
const messageSendButton = document.querySelector('.send-btn button');
const textArea = messageBox.querySelector('#mess');
const errorDiv = messageBox.querySelector('.error-div');
const galleryUpload = messageBox.querySelector('.gallery-upload');

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

function toggleErrorDiv() {
    if (errorDiv.classList.contains('active')) {
        errorDiv.classList.remove('active');
        errorDiv.style.cssText = 'height: 0; margin-bottom: 0px;';
    } else {
        errorDiv.classList.remove('active');
        errorDiv.style.cssText = 'height: 30px; margin-bottom: 5px;';
        setTimeout(() => {
            errorDiv.style.cssText = 'height: 0px; margin-bottom: 0px';
        }, 2000);
    }
}

function addCenteredMarker() {
    const imgEl = document.createElement('img');
    imgEl.classList.add('pin');
    imgEl.src = './media/icons/placeholder.svg';
    marker.appendChild(imgEl);
}

function openMessageBox() {
    messageBox.style.transform = 'translate(-50%, 0%)';
}

function removeCenteredMarker() {
    marker.innerHTML = '';
}

function initMapListeners() {
    map.on('click', destroyMessageInterface);
}

function initMessageInterface() {
    addCenteredMarker();
    openMessageBox();
    initMapListeners();
}

function removeMapListeners() {
    map.off('click', destroyMessageInterface);
}

function closeMessageBox() {
    messageBox.style.transform = 'translate(-50%, calc(100% + 20px)';
}

function destroyMessageInterface() {
    removeCenteredMarker();
    closeMessageBox();
    removeMapListeners();
    cleanMessageBox();
}

function cleanMessageBox() {
    textArea.value = '';
    messageSendButton.disabled = true;
}

messageSendButton.addEventListener('click', () => {
    
    if (textArea.value.replace(/\s/g, '').length) {
        messageSendButton.classList.add('state-1');

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
                    messageSendButton.classList.add('state-2');
                    setTimeout(() => {
                        destroyMessageInterface();
                        cleanMessageBox();
                        messageSendButton.classList.remove('state-1', 'state-2');
                    }, 1500);
                },
                error: () => {
                    messageSendButton.lastElementChild.innerText = 'Failed!';
                    messageSendButton.classList.add('state-2');
                    //alert('Ошибка отправки сообщения!');
                    setTimeout(() => {
                        messageSendButton.classList.remove('state-1', 'state-2');
                    }, 2000);
                }
            }); 
        }, 1000);
    }
});

textArea.addEventListener('input', () => {
    messageSendButton.disabled = textArea.value.replace(/\s/g, '').length ? false : true;
});

messageOption.addEventListener('click', () => {
    toggleOptionMenu();
    initMessageInterface();
    addCenteredMarker();
});

arrowSVG.addEventListener('click', () => toggleOptionMenu());
burgerBlock.addEventListener('click', () => toggleRightSideMenu());
galleryUpload.addEventListener('click', () => toggleErrorDiv());

$(window).on('load', () => {
    let $preloader = $('.preloader');	
    $preloader.delay(1000).fadeOut('slow', function() {
        $(this).remove();
    });
});