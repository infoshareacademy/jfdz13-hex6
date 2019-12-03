
const mobileViewport = window.matchMedia("screen and (max-width: 768px)");

const navigationContainer = document.getElementById("navigationContainer");

navigationContainer.onclick = function () {
    if (mobileViewport.matches) {
        if (navigationContainer.className === "navigationContainer--closed") {
            navigationContainer.className = "navigationContainer--open";
        } else {
            navigationContainer.className = "navigationContainer--closed";
        }
    }
};
