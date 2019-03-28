import $ from "jquery";

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

function subscribe(email) {
  return new Promise((resolve, reject) => {
    const request = {
      "email": email
    };

    const http = new XMLHttpRequest();

    http.open("POST", "https://l5pr1ybjl9.execute-api.us-west-2.amazonaws.com/dev/contact", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if ((http.status === 200 || http.status === 201)) {
          if (!http.responseText) {
            resolve();
          }
          const response = JSON.parse(http.responseText);
          if (response.status != "error") {
            resolve(response.data);
          } else {
            console.log("error");
            reject(response);
          }
        } else {
          const response = JSON.parse(http.responseText);
          reject(response);
        }
      }
    }
    http.send(JSON.stringify(request));
  });
}