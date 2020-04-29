const burgerBlock = document.querySelector('.open-overlay');
const rightSideMenu = document.querySelector('.menu');

const optionMenu = document.querySelector('.option-menu');
const arrowSVG = document.querySelector('#arrow');
const options = document.querySelectorAll('.option-item-top');

const messageOption = document.querySelector('#msgopt');
const messageBox = document.querySelector('.message');
const messageSendButton = document.querySelector('.send-btn button');
const textArea = messageBox.querySelector('#mess');

var marker = document.querySelector('.centered-marker');


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

async function sendMessage(JSONdata) {

    return await fetch("https://fefumap.ru/bot.php", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSONdata
    });
}

messageSendButton.addEventListener('click', () => {

    if (textArea.value.replace(/\s/g, '').length) {
        const JSONdata = JSON.stringify({ 
            Date: new Date(),
            latlng: marker._latlng,
            mess: textArea.value
        });

        sendMessage(JSONdata)
        .then(response => {
            if (response.status === 200) {
                console.log('Message has been sent!');
            } else {
                console.log(response.status);
                console.log('Something went wrong!');
            }
        })
        .catch(err => console.log(err)); 
        cleanMessageBox();
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

$(window).on('load', () => {
    let $preloader = $('.preloader');	
    $preloader.delay(1000).fadeOut('slow', function() {
        $(this).remove();
    });
});

