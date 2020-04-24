
//

const signInPanel = document.querySelector('.auth-panel');
const closeSingInPanel = document.querySelector('.btn-close');

const loginBtn = document.querySelector('.user');
const loginImg = document.querySelector('.user .user-img');

// const userPanel = document.querySelector('.user-panel');
// const userDataImg = document.querySelector('.user-icon .user-img');
// const userDataName = document.querySelector('.user-data__name');
// const userDataEmail = document.querySelector('.user-data__email');
// const userLogout = document.querySelector('.user-logout-btn');


const googleAuthKey = '1026855418031-jadtgqm4q4df08hs5dcf6pcu5ks5qklm.apps.googleusercontent.com'; 

const authPanel = `
    <div class="auth-panel">
        <div class="auth">
            <div id="auth-close"class="btn-close">
                <span class="stripe line-top"></span>
                <span class="stripe line-bottom"></span>
            </div>
            <div class="substrate">
                <img class="campus-auth" src="/media/logo/campus_gis.svg" alt="">
                <div class="sign-in-text">
                    <h3 class="sign-in-text--h3">
                        Sign in to get access to additional features of our site 
                    </h3>
                </div>
                <div class="auth-methods">
                    <div id="google-auth-btn" class="auth-button" data-onsuccess="onSignIn">
                        <div id="google-auth-btn" class="mer"><img class="social-icon" src="/media/socials/google-icon.svg" alt="Google logo">Sign in with Google</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

const userPanel = () => `
    <div class="user-panel hide">
        <div class="user-block">
            <div class="user-icon">
                <img class="user-img" src="/media/socials/user.svg" alt="">
            </div>
            <div class="user-data">
                <div class="user-data__name"></div>
                <div class="user-data__email"></div>
            </div>
        </div>
        <div class="user-logout-btn">
            <img class="logout-icon" src="/media/socials/logout.svg" alt="">
        </div>
    </div>`;




function initGoogleAuth() {
    var googleUser = {};
    var startApp = function() {
        gapi.load('auth2', 
            function() {
                auth2 = gapi.auth2.init({
                    client_id: googleAuthKey,
                    cookiepolicy: 'single_host_origin',
                });
                attachSignin(document.getElementById('google-auth-btn'));
            }, 
            function() { console.log('Unsuccess login'); }
        );
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
            }, 
            function() { console.log('Login failed!'); }
        );
    };    
    startApp();
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

    burgerAnimate();
}

function initAuth() {
    initGoogleAuth();
    initVkAuth();
}

function removeAuthPanel() {
    let element = document.querySelector('.auth-panel');
    element.parentNode.removeChild(element);
}


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

// userLogout.addEventListener('click', () => {
//     userPanel.classList.toggle('hide');
//     removeUserInfo();
// });