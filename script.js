const mobileViewport = window.matchMedia("screen and (max-width: 900px)");
const desktopViewport = window.matchMedia("screen and (min-width: 901px)");


const navigationContainer = document.getElementById("navigationContainer");
const hamburgerIcon = document.getElementById('navigationTitle');
const menuButtons = document.querySelectorAll('.navigation-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navigationContainer.classList.add('navigation-container--invisible');
    } else {
        navigationContainer.classList.remove('navigation-container--invisible');
    }
});

window.addEventListener('scroll', () => {
    if (mobileViewport.matches) {
        navigationContainer.classList.add('navigation-container--closed');
    } 
});

window.addEventListener('scroll', () => {
    
    const mainItem = document.getElementsByClassName('navigation-list__item')[0];
    const mainLink = document.getElementsByClassName('navigation-link')[0];

    const featureItem = document.getElementsByClassName('navigation-list__item')[1];
    const featureLink = document.getElementsByClassName('navigation-link')[1];

    const contactItem = document.getElementsByClassName('navigation-list__item')[2];
    const contactLink = document.getElementsByClassName('navigation-link')[2];

    const teamItem = document.getElementsByClassName('navigation-list__item')[3];
    const teamLink = document.getElementsByClassName('navigation-link')[3];

    if (desktopViewport.matches) {
        if (window.scrollY > 0 && window.scrollY < 799) {
            mainItem.classList.add('navigation-list__item--active');
            mainLink.classList.add('navigation-link--active');
            featureItem.classList.remove('navigation-list__item--active');
            featureLink.classList.remove('navigation-link--active');
            teamItem.classList.remove('navigation-list__item--active');
            teamLink.classList.remove('navigation-link--active');
        }

        if (window.scrollY > 800 && window.scrollY < 1299) {
            featureItem.classList.add('navigation-list__item--active');
            featureLink.classList.add('navigation-link--active');
            mainItem.classList.remove('navigation-list__item--active');
            mainLink.classList.remove('navigation-link--active');
            contactItem.classList.remove('navigation-list__item--active');
            contactLink.classList.remove('navigation-link--active');
        }

        if (window.scrollY > 1300 && window.scrollY < 1799) {
            contactItem.classList.add('navigation-list__item--active');
            contactLink.classList.add('navigation-link--active');
            featureItem.classList.remove('navigation-list__item--active');
            featureLink.classList.remove('navigation-link--active');
            teamItem.classList.remove('navigation-list__item--active');
            teamLink.classList.remove('navigation-link--active');
        }

        if (window.scrollY > 1800) {
            teamItem.classList.add('navigation-list__item--active');
            teamLink.classList.add('navigation-link--active');
            contactItem.classList.remove('navigation-list__item--active');
            contactLink.classList.remove('navigation-link--active');
        }
    }
});

hamburgerIcon.onclick = function () {
    if (mobileViewport.matches) {
        if (navigationContainer.className === "navigation-container" || navigationContainer.className === "navigation-container navigation-container--invisible") {
            navigationContainer.classList.add("navigation-container--closed");
        } else {
            navigationContainer.classList.remove("navigation-container--closed");
        }
    }
};

menuButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        if (mobileViewport.matches) {
            navigationContainer.classList.add("navigation-container--closed");
        }
    });
});



