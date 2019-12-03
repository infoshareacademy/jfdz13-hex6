
const mobileViewport = window.matchMedia("screen and (max-width: 768px)");

const navigationContainer = document.getElementById("navigationContainer");

navigationContainer.onclick = function () {
    if (mobileViewport.matches) {
        if (navigationContainer.className === "navigation-container navigation-container--closed") {
            navigationContainer.className = "navigation-container navigation-container--open";
            navigationContainer.style.transform = 'translateX(0vh)';
        } else {
            navigationContainer.className = "navigation-container navigation-container--closed";
            navigationContainer.style.transform = 'translateX(0vh)';
        }
    }
};
