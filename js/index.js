const burgerBlock = document.querySelector('.open-overlay')
const topBurgerLine = document.querySelector('.open-overlay .bar-top')
const middleBurgerLine = document.querySelector('.open-overlay .bar-middle');
const buttomBurgerLine = document.querySelector('.open-overlay .bar-bottom');
const rightSideMenu = document.querySelector('.menu');

const signInPanel = document.querySelector('.auth-panel');
const closeSingInPanel = document.querySelector('.btn-close');

const loginBtn = document.querySelector('.user');
const loginImg = document.querySelector('.user .user-img');
const userPanel = document.querySelector('.user-panel');
const userDataImg = document.querySelector('.user-icon .user-img');
const userDataName = document.querySelector('.user-data__name');
const userDataEmail = document.querySelector('.user-data__email');
const userLogout = document.querySelector('.user-logout-btn');

const googleAuthKey = '1026855418031-jadtgqm4q4df08hs5dcf6pcu5ks5qklm.apps.googleusercontent.com';

const authPanel = `
    <div class="auth-panel">
        <div class="auth">
            <div id="auth-close"class="btn-close">
                <span class="line-top"></span>
                <span class="line-bottom"></span>
            </div>
            <div class="substrate">
                <img class="campus-auth" src="campus_gis.svg" alt="">
                <div class="sign-in-text">
                    <h3 class="sign-in-text--h3">
                        Sign in to get access to additional features of our site 
                    </h3>
                </div>
                <div class="auth-methods">
                    <div id="google-auth-btn" class="auth-button" data-onsuccess="onSignIn">
                        <div id="google-auth-btn" class="mer"><img class="social-icon" src="/media/socials/google-icon.svg" alt="Google logo">Sign in with Google</div>
                    </div>
                    <div class="auth-button">
                        <div class="mer"><img class="social-icon" src="/media/socials/vkcom.svg" alt="Vk logo">Sign in with Vk</div>
                    </div>
                    <div class="auth-button">
                        <div class="mer">
                            <img class="social-icon" src="/media/socials/twitter.svg" alt="Twitter logo">Sign in with Twitter
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

function initGoogleAuth() {
    var googleUser = {};
    var startApp = function() {
        gapi.load('auth2', function() {
            //On success function
            auth2 = gapi.auth2.init({
                client_id: googleAuthKey,
                cookiepolicy: 'single_host_origin',
            });
            attachSignin(document.getElementById('google-auth-btn'));
        }, function() {
            //Add text to auth panel 
            console.log('Unsuccess log-in');
        });
    };

    function attachSignin(element) {
        auth2.attachClickHandler(element, {},
            function(googleUser) {
                let basicProfile = googleUser.getBasicProfile();
                var name = basicProfile.getName();
                var email = basicProfile.getEmail();
                var imgUrl = basicProfile.getImageUrl();

                renderUserInfo(name, email, imgUrl);
                removeAuthPanel();

                //TO DO 
                //SAVE USER DATA

            }, function() {
                console.log('Login failed!');
            });
    };
    
    startApp();
}

function burgerAnimate() {
    topBurgerLine.classList.toggle('open');
    middleBurgerLine.classList.toggle('open');
    buttomBurgerLine.classList.toggle('open');
    rightSideMenu.classList.toggle('open');
}

function renderUserInfo(name, email, imgUrl) { 
    userDataName.innerText = name;
    userDataEmail.innerText = email;
    userDataImg.src = imgUrl;
    loginImg.src = imgUrl;

    userPanel.classList.toggle('hide');
}

function removeUserInfo() {
    userDataName.innerText = "";
    userDataEmail.innerText = "";
    userDataImg.src = "../media/socials/user.svg";
    loginImg.src = "../media/socials/user.svg";
}

function initAuth() {
    initGoogleAuth();

    //Add other social auth;
}

function removeAuthPanel() {
    let element = document.querySelector('.auth-panel');
    element.parentNode.removeChild(element);
}

burgerBlock.addEventListener('click', () => {
    burgerAnimate();
});

loginBtn.addEventListener('click', () => {
    if (userDataName.innerText == "") {
        document.body.insertAdjacentHTML('beforeend', authPanel);
        document.querySelector('.btn-close').addEventListener('click', () => {
            removeAuthPanel();
        });
        initAuth();
    } else {
        console.log('Authorized');
    }
});

userLogout.addEventListener('click', () => {
    userPanel.classList.toggle('hide');
    removeUserInfo();
});

$(window).on('load', () => {
    let $preloader = $('.preloader');	
    $preloader.delay(1000).fadeOut('slow', function() {
        $(this).remove();
    });
});