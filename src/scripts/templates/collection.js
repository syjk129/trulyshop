import $ from 'jquery';

const selectors = {
  productCard: '[data-product-card]',
  productJson: '[data-product-json]',
  colorSwatch: '[data-product-card-color-swatch]',
  quickAdd: '[data-quick-add]',
  quickAddSize: '[data-quick-add-size]',
  quickAddSizeContainer: '[data-quick-add-size-container]',
  quickAddSizeColor: '[data-quick-add-size-color]',
  sizeValue: '[data-size-value]',
  variantName: '.variant-name'
}

$(selectors.productCard).each((index, productCard) => {
  // Stop parsing if we don't have the product json script tag when loading section
  if (!$(selectors.productJson, productCard).html()) {
    return;
  }

  const productObject = JSON.parse(
    $(selectors.productJson, productCard).html(),
  );

  // Toggle size for quick add button
  $(selectors.quickAdd, productCard)[0].addEventListener("click", evt => {
    evt.stopPropagation();
    const sizeSelector = $(selectors.quickAddSizeContainer, productCard);
    if (sizeSelector.length > 0) {
      evt.currentTarget.style.display = "none";
      sizeSelector[0].style.display = "flex";
      document.addEventListener("click", sizeClickOutsideListener(sizeSelector[0], evt.currentTarget));
    }
  });

  updateColorLabel(productCard);
  updateSizeSwatch(productCard);

  // Click handler for individual sizes
  $(selectors.quickAddSize, productCard).each((index, button) => {
    button.addEventListener("click", () => {
      const color = productCard.querySelector('input:checked').value;
      const size = button.dataset.value;
      const variant = productObject.variants.find(variant => {
        return variant.options.includes(color) && variant.options.includes(size);
      });

      console.log(variant);

      $.post("/cart/add.js", {
        quantity: 1,
        id: variant.id
      }, onCartChange, "json");
    })
  });
});

// Update Color Label
function updateColorLabel(productCard) {
  $(selectors.colorSwatch, productCard).each((index, swatch) => {
    $(swatch).change(evt => {
      $(selectors.variantName, productCard)[0].innerHTML = evt.target.value;
      updateSizeSwatch();
    })
  })
}

// Hide irrelevant size swatches
function updateSizeSwatch(productCard) {
  $(selectors.quickAddSizeColor, productCard).each((index, quickAddSizeColor) => {
    const currentVariantColor = $(selectors.variantName, productCard)[0].innerHTML;
    if (currentVariantColor.trim().toLowerCase() != quickAddSizeColor.dataset.quickAddSizeColor.toLowerCase()) {
      quickAddSizeColor.style.display = "none";
    } else {
      quickAddSizeColor.style.display = "block";
    }
  });
}


// When the user clicks outide the size selector
function sizeClickOutsideListener(element, target) {
  return function helper(evt) {
    if (!element.contains(evt.target)) {
      element.style.display = "none";
      target.style.display = "block";
      document.removeEventListener("click", helper);
    }
  }
}

function onCartChange() {
  window.location.href = "/cart";
}