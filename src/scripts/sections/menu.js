import $ from "jquery";

const menuNavAccountBtn = document.getElementById("account-menu-btn");

const mainMenu = document.getElementById("menu-nav-main");
const accountMenu = document.getElementById("menu-nav-account");
const menuNavBack = document.getElementById("menu-nav-back");

$(document).ready(() => {
  if (window.location.pathname == "/account") {
    menuNavBack.style.display = "block";
    mainMenu.style.display = "none";
    accountMenu.style.display = "flex";
  }
});

menuNavAccountBtn.onclick = () => {
  menuNavBack.style.display = "block";
  mainMenu.style.display = "none";
  accountMenu.style.display = "flex";
}

menuNavBack.onclick = () => {
  menuNavBack.style.display = "none";
  mainMenu.style.display = "flex";
  accountMenu.style.display = "none";
}