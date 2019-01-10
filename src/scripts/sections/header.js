const header = document.getElementById("header-container");
const placeholder = document.getElementById("header-placeholder");

placeholder.style.height = `${header.getBoundingClientRect().height}px`;

// Sidebar
const sidebarOverlay = document.getElementById("sidebar-overlay");

const cartButton = document.getElementById("header-cart");
cartButton.onclick = () => {
  toggleSidebar("sidebar-cart");
}

function toggleSidebar(sidebarId) {
  const sidebar = document.getElementById(sidebarId);
  if (sidebar.getBoundingClientRect().width === 0) {
    sidebarOverlay.style.display = "block";
    sidebar.style.width = "250px";
    sidebarOverlay.addEventListener("click", sidebarClickOutside(sidebar));
  } else {
    sidebarOverlay.style.display = "none";
    sidebar.style.width = "0px";
    sidebarOverlay.removeEventListener("click", sidebarClickOutside(sidebar));
  }
}

function sidebarClickOutside(sidebar) {
  return function(evt) {
    sidebar.style.width = "0px";
    evt.preventDefault();
    sidebarOverlay.style.display = "none";
  }
}