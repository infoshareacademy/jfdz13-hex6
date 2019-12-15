
const mobileViewport = window.matchMedia("screen and (max-width: 900px)");
const desktopViewport = window.matchMedia("screen and (min-width: 901px)");


const navigationContainer = document.getElementById("navigationContainer");
const hamburgerIcon = document.getElementById('navigationTitle');
const menuButtons = document.querySelectorAll('.navigation-list__item');
console.log(menuButtons);

hamburgerIcon.onclick = function () {
    if (mobileViewport.matches) {
        if (navigationContainer.className === "navigation-container" || navigationContainer.className === "navigation-container navigation-container--invisible") {
            navigationContainer.classList.add("navigation-container--closed");
        } else {
            navigationContainer.classList.remove("navigation-container--closed");
     }
    }
};

menuButtons.onclick = function () {
    if (mobileViewport.matches) {
            navigationContainer.classList.add('navigation-container--closed');
    }
};



function hasScrolled() {
    if (desktopViewport.matches) {
        let scrollTop = window.scrollY;
        if (scrollTop > 0){
            navigationContainer.classList.add('navigation-container--invisible');
        } else {
            navigationContainer.classList.remove('navigation-container--invisible');
        }
    }
}

document.addEventListener('scroll', function() {
  isScrolling = true;
}, false);

setInterval(function() {
  if (isScrolling) {
    hasScrolled();
    isScrolling = false;
  }
}, 100);