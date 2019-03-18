import $ from "jquery";

$(document).ready(() => {
  const header = document.getElementById("header-container");
  const placeholder = document.getElementById("header-placeholder");

  placeholder.style.height = `${header.getBoundingClientRect().height}px`;

  // Footer
  const footer = document.getElementById("footer");
  const body = document.getElementsByTagName("body")[0];
  body.style.paddingBottom = `${footer.getBoundingClientRect().height}px`;
  body.style.minHeight = `${window.innerHeight - footer.getBoundingClientRect().height}px`;

  const cartButton = document.getElementById("header-cart");
  cartButton.onclick = () => {
    toggleSidebar("menu-cart");
  }

  const menuButton = document.getElementById("header-menu-btn");
  menuButton.onclick = () => {
    toggleSidebar("menu-nav");
  }
});


// Sidebar
const sidebarOverlay = document.getElementById("menu-overlay");

function toggleSidebar(sidebarId) {
  const sidebar = document.getElementById(sidebarId);
  const close = sidebar.getElementsByClassName("menu-close")[0];
  if (sidebar.getBoundingClientRect().right > window.innerWidth) {
    sidebarOverlay.style.display = "block";
    sidebar.style.right = "0";
    sidebarOverlay.addEventListener("click", sidebarClickOutside(sidebar));
    close.addEventListener("click", sidebarClickOutside(sidebar));
  } else if (sidebar.getBoundingClientRect().left < 0) {
    sidebarOverlay.style.display = "block";
    sidebar.style.left = 0;
    sidebarOverlay.addEventListener("click", sidebarClickOutside(sidebar));
    close.addEventListener("click", sidebarClickOutside(sidebar));
  } else {
    sidebarOverlay.style.display = "none";
    if (sidebar.classList.contains("left")) {
      sidebar.style.left = `-${sidebar.getBoundingClientRect().width + 10}px`; 
    } else {
      sidebar.style.right = `-${sidebar.getBoundingClientRect().width + 10}px`; 
    }
    sidebarOverlay.removeEventListener("click", sidebarClickOutside(sidebar));
    close.removeEventListener("click", sidebarClickOutside(sidebar));
  }
}

function sidebarClickOutside(sidebar) {
  return function(evt) {
    if (sidebar.classList.contains("left")) {
      sidebar.style.left = `-${sidebar.getBoundingClientRect().width + 10}px`;
    } else {
      sidebar.style.right = `-${sidebar.getBoundingClientRect().width + 10}px`;
    }
    evt.preventDefault();
    sidebarOverlay.style.display = "none";
  }
}