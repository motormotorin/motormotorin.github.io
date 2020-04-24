const burgerBlock = document.querySelector('.open-overlay')
const topBurgerLine = document.querySelector('.open-overlay .bar-top')
const middleBurgerLine = document.querySelector('.open-overlay .bar-middle');
const bottomBurgerLine = document.querySelector('.open-overlay .bar-bottom');
const rightSideMenu = document.querySelector('.menu');

const optionsMenu = document.querySelector('.option-menu');
const arrowSVG = document.querySelector('#arrow');
var options = document.querySelectorAll('.option-item-right');

function burgerAnimate() {
    [topBurgerLine, middleBurgerLine, bottomBurgerLine, rightSideMenu]
        .forEach(el => el.classList.toggle('open'));
}

burgerBlock.addEventListener('click', () => {
    burgerAnimate();
});


arrowSVG.addEventListener('click', () => {
    if (optionsMenu.classList.contains('open')) {
        options.forEach(el => {
            el.style.right = '0px';
        });
        arrowSVG.parentElement.classList.toggle('rotate');
        optionsMenu.style.width = '60px';
        optionsMenu.classList.remove('open');

    } else {
        optionsMenu.classList.add('open');
        arrowSVG.parentElement.classList.toggle('rotate');
        optionsMenu.style.width = `${60 + options.length * 40}px`;
        options.forEach((el, index) => {
            el.style.right = `${(index + 1) * 40}px`;
        });
    }
});

$(window).on('load', () => {
    let $preloader = $('.preloader');	
    $preloader.delay(1000).fadeOut('slow', function() {
        $(this).remove();
    });
});