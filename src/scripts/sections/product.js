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
  productDetails: '[data-product-details]',
  productImageWrapper: '[data-product-image-wrapper]',
  productFeaturedImage: '[data-product-featured-image]',
  productJson: '[data-product-json]',
  productPrice: '[data-product-price]',
  productThumbs: '[data-product-single-thumbnail]',
  singleOptionSelector: '[data-single-option-selector]',
  colorSwatch: ['[data-product-color-swatch]']
};

document.addEventListener('DOMContentLoaded', () => {
  load('*');
});

$(document).ready(() => {
  // Product Images
  const productImagesDesktop = document.getElementsByClassName("product-images-desktop");
  const productImagesMobile = document.getElementsByClassName("product-image-slider");
  if (productImagesDesktop && productImagesDesktop.length > 0) {
    productImagesDesktop[1].style.display = "none";
    productImagesMobile[1].style.display = "none";
    $('.product-image-slider').slick("setPosition");
  }

  // See how models style
  const seeHowStyles = $(".see-how-style").filter(":visible");
  if (seeHowStyles && seeHowStyles.length == 2) {
    seeHowStyles[1].style.display = "none";

    seeHowStyles[0].getElementsByClassName("btn")[0].onclick = () => {
      seeHowStyles[0].style.display = "none";
      seeHowStyles[1].style.display = "flex";
      productImagesDesktop[0].style.display = "none";
      productImagesDesktop[1].style.display = "block";
      productImagesMobile[0].style.display = "none";
      productImagesMobile[1].style.display = "block";
      $('.product-image-slider').slick("setPosition");
    }
    seeHowStyles[1].getElementsByClassName("btn")[0].onclick = () => {
      seeHowStyles[0].style.display = "flex";
      seeHowStyles[1].style.display = "none";
      productImagesDesktop[0].style.display = "block";
      productImagesDesktop[1].style.display = "none";
      productImagesMobile[0].style.display = "block";
      productImagesMobile[1].style.display = "none";
      $('.product-image-slider').slick("setPosition");
    }
  }

  $(selectors.productDetails).each((index, productDetails) => {
    updateColorSwatch(productDetails);
    updateSizeSwatch(productDetails);
  })

  // Put this here last so that sticky is initialized after swatches are updated
  initializeStickySidebar();
});

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
