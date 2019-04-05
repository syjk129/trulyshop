export function setCookie(name, value, exp) {
  let expires;
  if (exp) {
    const date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    expires = `expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function getCookie(name) {
  name = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}