
const mobileViewport = window.matchMedia("screen and (max-width: 768px)");
const navigationContainer = document.getElementById("navigation-container");

navigationContainer.onclick = function () {
    if (mobileViewport.matches) {
        if (navigationContainer.className === "navigation-container--closed") {
            navigationContainer.className = "navigation-container--open";
        } else {
            navigationContainer.className = "navigation-container--closed";
        }
    }
};