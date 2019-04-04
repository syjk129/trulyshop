import $ from 'jquery';

import "../libraries/sticky-sidebar";

$(document).ready(() => {
  initializeStickySidebar();
});

$(window).on("load", () => {
  // Do this again so that it resets after page is loaded
  initializeStickySidebar();
})

function initializeStickySidebar() {
  if ($(window).width() > 600) {
    const header = document.getElementById("header-container");
    if (document.getElementById("sidebar-nav")) {
      const sticky = new StickySidebar("#sidebar-nav", {
        containerSelector: "#theme-content",
        innerWrapperSelector: ".sidebar__inner",
        topSpacing: header.getBoundingClientRect().height + 70,
      });

      window.addEventListener("resize", () => {
        sticky.updateSticky();
      });
      return sticky;
    } else if (document.getElementById("sidebar-account-nav")) {
      const sticky = new StickySidebar("#sidebar-account-nav", {
        containerSelector: "#theme-content",
        innerWrapperSelector: ".sidebar__inner",
        topSpacing: header.getBoundingClientRect().height + 70,
      });

      window.addEventListener("resize", () => {
        sticky.updateSticky();
      });
      return sticky;
    }
  }
}

if (window.location.pathname.includes("about-us")) {
  const sticky = initializeStickySidebar();
  const page = document.getElementsByClassName("rte")[0];
  const images = page.getElementsByTagName("img");
  let promises = [];

  for (let i = 0; i < images.length; i++) {
    promises.push(setImageAspectRatio(images[i]));
  }

  Promise.all(promises).then(() => {
    sticky.updateSticky();
  }).catch(err => {
    console.warn(err);
  })
}

function setImageAspectRatio(image) {
  const imageContainerEl = document.createElement("div");
  const imageEl = image.cloneNode();

  return new Promise((resolve, reject) => {
    let iterations = 0;
    const interval = setInterval(() => {
      iterations++;
      if (iterations >= 50) {
        reject();
        clearInterval(interval);
      }

      if (image.naturalHeight) {
        clearInterval(interval);
        imageContainerEl.classList.add("ratio-image");
        imageContainerEl.style.paddingTop = `${image.naturalHeight / image.naturalWidth * 100}%`;
        imageContainerEl.appendChild(imageEl);
        if (image.parentNode.tagName.toLowerCase() == "span") {
          image.parentNode.parentNode.replaceChild(imageContainerEl, image.parentNode);
        } else {
          image.parentNode.replaceChild(imageContainerEl, image);
        }
        resolve();
      }
    }, 100);
  })
}