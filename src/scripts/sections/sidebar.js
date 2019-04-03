import $ from 'jquery';

import "../libraries/sticky-sidebar";

$(document).ready(() => {
  // initializeStickySidebar();
});

function initializeStickySidebar() {
  console.log("yo");
  if ($(window).width() > 600) {
    if (document.getElementById("sidebar-nav")) {
      const header = document.getElementById("header-container");
      const sticky = new StickySidebar("#sidebar-nav", {
        containerSelector: "#theme-content",
        innerWrapperSelector: ".sidebar__inner",
        topSpacing: header.getBoundingClientRect().height + 70,
      });

      window.addEventListener("resize", () => {
        sticky.updateSticky();
      });
    } else if (document.getElementById("sidebar-account-nav")) {
      const header = document.getElementById("header-container");
      const sticky = new StickySidebar("#sidebar-account-nav", {
        containerSelector: "#theme-content",
        innerWrapperSelector: ".sidebar__inner",
        topSpacing: header.getBoundingClientRect().height + 70,
      });

      window.addEventListener("resize", () => {
        sticky.updateSticky();
      });
    }
  }
}