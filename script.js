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
    const featureItem = document.getElementsByClassName('navigation-list__item')[1];
    const featureLink = document.getElementsByClassName('navigation-link')[1];
    

    // for (i = 0; i <= 5; i++) {

    // }

    if (window.scrollY > 200) {
        featureItem.classList.add('navigation-list__item--active');
        featureLink.classList.add('navigation-link--active');
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



