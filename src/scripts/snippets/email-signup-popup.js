import $ from "jquery";

$(document).ready(() => {
  const emailSignupPopup = document.getElementById("email-signup-popup");
  const closeButton = emailSignupPopup.getElementsByClassName("close")[0];
  closeButton.onclick = () => {
    emailSignupPopup.style.right = `-${emailSignupPopup.getBoundingClientRect().width}px`;
  }
  setTimeout(() => {
    emailSignupPopup.style.right = "0px";
  }, 5000);
});