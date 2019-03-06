import $ from "jquery";

// Display Share Page
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("share") == 1) {
  const accountPage = document.getElementById("account");
  const sharePage = document.getElementById("share");
  const accountLink = document.getElementById("sidebar-account-link");
  const shareLink = document.getElementById("sidebar-share-link");
  const shareCodeInput = document.getElementById("share-code");

  accountPage.style.display = "none";
  sharePage.style.display = "block";
  accountLink.classList.remove("selected");
  shareLink.classList.add("selected");

  shareCodeInput.value = "hello";
  $.get(`https://l5pr1ybjl9.execute-api.us-west-2.amazonaws.com/dev/contact/email/${sharePage.dataset.customerEmail}`, data => {
    console.log(data);
  })
}