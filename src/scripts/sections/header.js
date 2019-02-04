const header = document.getElementById("header-container");
const placeholder = document.getElementById("header-placeholder");

placeholder.style.height = `${header.getBoundingClientRect().height}px`;

// Footer
const footer = document.getElementById("footer");
const body = document.getElementsByTagName("body")[0];
body.style.paddingBottom = `${footer.getBoundingClientRect().height}px`;
body.style.minHeight = `${window.innerHeight - footer.getBoundingClientRect().height}px`;

// Sidebar
const sidebarOverlay = document.getElementById("sidebar-overlay");

const cartButton = document.getElementById("header-cart");
cartButton.onclick = () => {
  toggleSidebar("sidebar-cart");
}

function toggleSidebar(sidebarId) {
  const sidebar = document.getElementById(sidebarId);
  const close = sidebar.getElementsByClassName("sidebar-close")[0];
  if (sidebar.style.right !== "0") {
    sidebarOverlay.style.display = "block";
    sidebar.style.right = "0";
    sidebarOverlay.addEventListener("click", sidebarClickOutside(sidebar));
    close.addEventListener("click", sidebarClickOutside(sidebar));
  } else {
    sidebarOverlay.style.display = "none";
    sidebar.style.right = `-${sidebar.getBoundingClientRect().width}px`; 
    sidebarOverlay.removeEventListener("click", sidebarClickOutside(sidebar));
    close.removeEventListener("click", sidebarClickOutside(sidebar));
  }
}

function sidebarClickOutside(sidebar) {
  return function(evt) {
    sidebar.style.right = `-${sidebar.getBoundingClientRect().width}px`;
    evt.preventDefault();
    sidebarOverlay.style.display = "none";
  }
}