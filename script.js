
const mobileViewport = window.matchMedia("screen and (max-width: 768px)");

const navigationContainer = document.getElementById("navigationContainer");
const navigationTitle = document.getElementById("navigationTitle");

navigationContainer.onclick = function () {
    if (mobileViewport.matches) {
        if (navigationContainer.className === "navigation-container navigation-container--closed") {
            navigationContainer.className = "navigation-container navigation-container--open";
            navigationTitle.className = "navigation-title navigation-title--open";
        } else {
            navigationContainer.className = "navigation-container navigation-container--closed";
            navigationTitle.className = "navigation-title navigation-title--closed";
        }
    }
};
