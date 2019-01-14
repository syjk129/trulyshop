const header = document.getElementById("header-container");
const placeholder = document.getElementById("header-placeholder");

placeholder.style.height = `${header.getBoundingClientRect().height}px`;

// Sidebar
const sidebarWidth = 400;
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
    sidebar.style.right = `-${sidebarWidth}px`; 
    sidebarOverlay.removeEventListener("click", sidebarClickOutside(sidebar));
    close.removeEventListener("click", sidebarClickOutside(sidebar));
  }
}

function sidebarClickOutside(sidebar) {
  return function(evt) {
    sidebar.style.right = `-${sidebarWidth}px`;
    evt.preventDefault();
    sidebarOverlay.style.display = "none";
  }
}