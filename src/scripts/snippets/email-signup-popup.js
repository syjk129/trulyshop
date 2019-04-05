import $ from "jquery";

import { subscribe } from "../requests/subscribe";
import { setCookie, getCookie } from "../util/cookie";

$(document).ready(() => {
  const emailSignupPopup = document.getElementById("email-signup-popup");
  const closeButton = emailSignupPopup.getElementsByClassName("close")[0];

  closeButton.onclick = () => {
    dismissEmailSignupPopup();
  }

  console.log(getCookie("emailSubscribedFromSignupPopup") != "true");
  if (!sessionStorage["dismissEmailSignupPopup"] && getCookie("emailSubscribedFromSignupPopup") != "true") {
    setTimeout(() => {
      emailSignupPopup.style.right = "0px";
    }, 4000);
  }

  const emailSignupPopupForm = document.getElementById("email-signup-popup-form");
  emailSignupPopupForm.onsubmit = async (evt) => {
    evt.preventDefault();

    const emailEl = evt.target[0];
    const email = emailEl.value;
    const errorEl = document.getElementById("email-signup-popup-error");
    errorEl.innerHTML = "Hold on...";

    try {
      await subscribe(email);
      errorEl.classList.add("success");
      errorEl.classList.remove("error");
      errorEl.innerHTML = "Subscribed!";
      emailEl.disabled = true;
      setCookie("emailSubscribedFromSignupPopup", "true", 90);
      setTimeout(() => {
        dismissEmailSignupPopup();
      }, 2000);
    } catch (err) {
      errorEl.classList.remove("success");
      errorEl.classList.add("error");
      const error = JSON.parse(err).err;
      if (error.email) {
        errorEl.innerHTML = error.email;
      } else if (error.msg) {
        errorEl.innerHTML = error.msg;
      } else {
        errorEl.innerHTML = "There was an issue with the request. Please try again later";
      }
    }

    return false;
  }
});

function dismissEmailSignupPopup() {
  const emailSignupPopup = document.getElementById("email-signup-popup");
  emailSignupPopup.style.right = `-${emailSignupPopup.getBoundingClientRect().width}px`;
  sessionStorage["dismissEmailSignupPopup"] = true;
}