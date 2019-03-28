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
  productImageWrapper: '[data-product-image-wrapper]',
  productFeaturedImage: '[data-product-featured-image]',
  productJson: '[data-product-json]',
  productPrice: '[data-product-price]',
  productThumbs: '[data-product-single-thumbnail]',
  singleOptionSelector: '[data-single-option-selector]',
};

const cssClasses = {
  activeThumbnail: 'active-thumbnail',
  hide: 'hide',
};

document.addEventListener('DOMContentLoaded', () => {
  load('*');
});

$(document).ready(() => {
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

  // See how style
  const seeHowStyles = document.getElementsByClassName("see-how-style");
  seeHowStyles[1].style.display = "none";
  seeHowStyles[0].getElementsByClassName("btn")[0].onclick = () => {
    seeHowStyles[0].style.display = "none";
    seeHowStyles[1].style.display = "flex";
  }
  seeHowStyles[1].getElementsByClassName("btn")[0].onclick = () => {
    seeHowStyles[0].style.display = "flex";
    seeHowStyles[1].style.display = "none";
  }
});

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
    console.log(variant);
    $(selectors.originalSelectorId).val(variant.id);
  },

  /**
   * Event callback for Theme Editor `section:unload` event
   */
  onUnload() {
    this.$container.off(this.namespace);
  },
});
