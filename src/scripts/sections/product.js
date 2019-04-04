/**
 * Product Template Script
 *
 * @namespace product
 */

import $ from 'jquery';
import Variants from '@shopify/theme-variants';
import { load, register } from '@shopify/theme-sections';
import "../libraries/sticky-sidebar";

const selectors = {
  addToCart: '[data-add-to-cart]',
  addToCartText: '[data-add-to-cart-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  originalSelectorId: '[data-product-select]',
  priceWrapper: '[data-price-wrapper]',
  productWrapper: '[data-product-wrapper]',
  productDetails: '[data-product-details]',
  productImageWrapper: '[data-product-image]',
  productFeaturedImage: '[data-product-featured-image]',
  productJson: '[data-product-json]',
  productPrice: '[data-product-price]',
  productThumbs: '[data-product-single-thumbnail]',
  singleOptionSelector: '[data-single-option-selector]',
  sizeGuideToggle: '[data-size-guide-toggle]'
};

document.addEventListener('DOMContentLoaded', () => {
  load('*');
});

$(document).ready(() => {
  $(selectors.productWrapper).each((index, productWrapper) => {
    const productDetails = productWrapper.getElementsByClassName("product-details")[0];
    initSizeGuideToggle(productWrapper);
    initSeeHowStyle(productDetails);
    updateColorSwatch(productDetails);
    updateSizeSwatch(productDetails);
    const color = productDetails.querySelector('input[name="color-option"]:checked').value;
    updateProductImages(color);
  });

  initMobileProductVideoHandler();
  initializeStickySidebar();
});

$(window).on("load", () => {
  // Put this here so that sticky is initialized again after page is all loaded
  // Kind of a hack tho
  initializeStickySidebar();
})

function initSizeGuideToggle(productWrapper) {
  $(selectors.sizeGuideToggle, productWrapper).each((index, sizeGuideToggle) => {
    sizeGuideToggle.onclick = () => {
      document.getElementById("size-guide-modal").style.display = "block";
    }
  })
}

function initSeeHowStyle(productDetails) {
  const seeHowStyles = $(".see-how-style:visible");
  if (seeHowStyles && seeHowStyles.length == 2) {
    seeHowStyles[1].style.display = "none";

    seeHowStyles[0].getElementsByClassName("btn")[0].onclick = () => {
      const color = productDetails.querySelector('input[name="color-option"]:checked').value;
      updateProductImages(color, seeHowStyles[1].dataset.model);
      seeHowStyles[0].style.display = "none";
      seeHowStyles[1].style.display = "flex";
    }
    seeHowStyles[1].getElementsByClassName("btn")[0].onclick = () => {
      const color = productDetails.querySelector('input[name="color-option"]:checked').value;
      updateProductImages(color, seeHowStyles[0].dataset.model);
      seeHowStyles[0].style.display = "flex";
      seeHowStyles[1].style.display = "none";
    }
  }
}

function updateProductImages(currentColor, currentModel) {
  if (!currentModel) {
    currentModel = $('.see-how-style:visible')[0].dataset.model;
  }
  // console.log(currentColor);
  // console.log(currentModel);

  // Desktop
  $(selectors.productImageWrapper).each((index, productImage) => {
    const productImageModel = productImage.dataset.model;
    const productImageColor = productImage.dataset.color;
    if (productImageColor.trim() != currentColor.trim() || productImageModel.trim() != currentModel.trim()) {
      productImage.style.display = "none";
    } else {
      productImage.style.display = "block";
    }
  });

  // Mobile
  $('[data-product-image-slider]').each((index, slider) => {
    const productImageModel = slider.dataset.model;
    const productImageColor = slider.dataset.color;
    if (productImageColor.trim() != currentColor.trim() || productImageModel.trim() != currentModel.trim()) {
      slider.style.display = "none";
    } else {
      slider.style.display = "block";
    }
    $('.product-image-slider').slick("setPosition");
  })
}

function initMobileProductVideoHandler() {
  $("[data-product-video]").each((index, videoEl) => {
    videoEl.onclick = () => {
      const iframe = videoEl.getElementsByClassName("mobile-product-video")[0];
      const image = videoEl.getElementsByClassName("slider-image")[0];
      image.style.display = "none";
      iframe.style.display = "block";
      window.addEventListener("blur", resetProductVideoHandler(videoEl));
    }
  })
}

function resetProductVideoHandler(videoEl) {
  return function helper() {
    const iframe = videoEl.getElementsByClassName("mobile-product-video")[0];
    if (document.activeElement === iframe) {
      // clicked
      const image = videoEl.getElementsByClassName("slider-image")[0];
      image.style.display = "block";
      iframe.style.display = "none";
    }
  }
}

function updateColorSwatch(productDetails) {
  const currentSize = productDetails.querySelector('input[name="size-option"]:checked').value;
  const colorSwatches = productDetails.getElementsByClassName("color-swatch");
  for (let i = 0; i < colorSwatches.length; i++) {
    const swatch = colorSwatches[i];
    if (swatch.dataset.size != currentSize) {
      swatch.style.display = "none";
    } else {
      swatch.style.display = "block";
    }
    
    swatch.onclick = (evt) => {
      updateSizeSwatch(productDetails);
      updateSubmitButton(evt.target.value, currentSize, productDetails);
      updateProductImages(evt.target.value);
    }
  }
}

function updateSizeSwatch(productDetails) {
  const currentColor = productDetails.querySelector('input[name="color-option"]:checked').value;
  const sizeSwatches = productDetails.getElementsByClassName("size-swatch");
  for (let i = 0; i < sizeSwatches.length; i++) {
    const swatch = sizeSwatches[i];
    if (swatch.dataset.color != currentColor) {
      swatch.style.display = "none";
    } else {
      swatch.style.display = "block";
    }

    swatch.onclick = evt => {
      updateSubmitButton(currentColor, evt.target.value, productDetails);
    }
  }

  // Pre-select first option
  const visibleSizeOptions = $("input[name='size-option']", productDetails).not(".unavailable").filter(":visible");
  visibleSizeOptions[0].checked = true;
}

function updateSubmitButton(color, size, productDetails) {
  const submitButton = productDetails.querySelector('button[name="add"]');
  if (!$(selectors.productJson, productDetails).html()) {
    return;
  }
  const product = JSON.parse(
    $(selectors.productJson, productDetails).html(),
  );
  const variant = product.variants.find(variant => {
    return variant.options.includes(color) && variant.options.includes(size)
  });

  if (variant && variant.available) {
    submitButton.disabled = false;
    submitButton.innerHTML = "Add to Cart";
  } else {
    submitButton.disabled = true;
    submitButton.innerHTML = "Sold Out";
  }
}

function initializeStickySidebar() {
  if (document.getElementById("product-details") && $(window).width() > 768) {
    const header = document.getElementById("header-container");
    const sticky = new StickySidebar("#product-details", {
      containerSelector: "#product-content",
      innerWrapperSelector: ".sidebar__inner",
      topSpacing: header.getBoundingClientRect().height + 20
    });

    window.addEventListener("resize", () => {
      sticky.updateSticky();
    });
  }
}


// Shopify Product Stuff
register('product', {
  onLoad() {
    this.$container = $(this.container);
    this.namespace = `.${this.id}`;

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$(selectors.productJson, this.$container).html()) {
      return;
    }

    this.productSingleObject = JSON.parse(
      $(selectors.productJson, this.$container).html(),
    );

    const options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: selectors.singleOptionSelector,
      originalSelectorId: selectors.originalSelectorId,
      product: this.productSingleObject,
    };

    this.settings = {};
    this.variants = new Variants(options);
    this.$featuredImage = $(selectors.productFeaturedImage, this.$container);

    this.$container.on(
      `variantChange${this.namespace}`,
      this.updateAddToCartState.bind(this),
    );
  },

  /**
   * Updates the DOM state of the add to cart button
   */
  updateAddToCartState() {
    const size = document.querySelector('input[name = "size-option"]:checked').value;
    const color = document.querySelector('input[name = "color-option"]:checked').value;

    const variant = this.variants.product.variants.find(variant => {
      return variant.options.includes(size) && variant.options.includes(color);
    });
    $(selectors.originalSelectorId).val(variant.id);
  },

  /**
   * Event callback for Theme Editor `section:unload` event
   */
  onUnload() {
    this.$container.off(this.namespace);
  },
});
