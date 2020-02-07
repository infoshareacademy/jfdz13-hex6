/* COOKIES CONSENT*/

const GetCookie = (name) => {
  let argument = name + "=";
  let argumentLength = argument.length;
  let cookieLength = document.cookie.length;
  let i = 0;
  while (i < cookieLength) {
    let j = i + argumentLength;
    if (document.cookie.substring(i, j) == argument)
      return "got_it";
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

const testIfFirstTime = () => {
  let offset = new Date().getTimezoneOffset();
  if ((offset >= -180) && (offset <= 0)) {
    let visit = GetCookie("cookiesAccepted");
    if (visit == null) {
      $(".cookieConsent").fadeIn(600);
    }
  }
}
$(document).ready(function () {
  $(".cookieConsent__button").click(function () {
    let expire = new Date();
    expire = new Date(expire.getTime() + 7776000000);
    document.cookie = "cookiesAccepted=got_it; expires=" + expire + ";path=/";
    $(".cookieConsent").fadeOut(600);
  });
  testIfFirstTime();
});