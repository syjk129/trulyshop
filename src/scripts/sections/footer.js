import { subscribe } from "../requests/subscribe";

const footerSubscribeForm = document.getElementById("footer-subscribe");
footerSubscribeForm.onsubmit = async (evt) => {
  evt.preventDefault();

  const emailEl = evt.target[0];
  const email = emailEl.value;
  const errorEl = document.getElementById("footer-subscribe-error");
  errorEl.innerHTML = "Hold on...";

  try {
    const response = await subscribe(email);
    errorEl.classList.add("success");
    errorEl.classList.remove("error");
    errorEl.innerHTML = "Subscribed!";
    emailEl.disabled = true;
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
