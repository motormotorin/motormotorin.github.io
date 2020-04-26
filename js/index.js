const burgerBlock = document.querySelector('.open-overlay')
const topBurgerLine = document.querySelector('.open-overlay .bar-top')
const middleBurgerLine = document.querySelector('.open-overlay .bar-middle');
const bottomBurgerLine = document.querySelector('.open-overlay .bar-bottom');
const rightSideMenu = document.querySelector('.menu');

const optionsMenu = document.querySelector('.option-menu');
const arrowSVG = document.querySelector('#arrow');
const options = document.querySelectorAll('.option-item-top');

const messageOption = document.querySelector('#msgopt');
const messageBox = document.querySelector('.message');
const sendButton = document.querySelector('.send-btn button');





function toggleBurgerButton() {
    [topBurgerLine, middleBurgerLine, bottomBurgerLine, rightSideMenu]
        .forEach(el => el.classList.toggle('open'));
}

function toggleOptionMenu() {
    if (optionsMenu.classList.contains('open')) {
        options.forEach(el => {
            el.style.top = '0px';
        });
        arrowSVG.parentElement.classList.toggle('rotate');
        optionsMenu.style.height = '60px';
        optionsMenu.classList.remove('open');

    } else {
        optionsMenu.classList.add('open');
        arrowSVG.parentElement.classList.toggle('rotate');
        optionsMenu.style.height = `${60 + options.length * 40}px`;
        options.forEach((el, index) => {
            el.style.top = `${(index + 1) * 40}px`;
        });
    }
}


burgerBlock.addEventListener('click', () => {
    toggleBurgerButton();
});

messageOption.addEventListener('click', () => {
    messageBox.style.bottom = '0%';
});

sendButton.addEventListener('click', () => {
    messageBox.style.bottom = '-100%';
    console.log('Send...');
});

arrowSVG.addEventListener('click', () => {
    toggleOptionMenu();
});

$(window).on('load', () => {
    let $preloader = $('.preloader');	
    $preloader.delay(1000).fadeOut('slow', function() {
        $(this).remove();
    });
});