import $ from 'jquery';

const selectors = {
  productCard: '[data-product-card]',
  productJson: '[data-product-json]',
  quickAdd: '[data-quick-add]',
  quickAddSize: '[data-quick-add-size]',
  quickAddSizeContainer: '[data-quick-add-size-container]',
  sizeValue: '[data-size-value]',
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

  // Click handler for individual sizes
  $(selectors.quickAddSize, productCard).each((index, button) => {
    button.addEventListener("click", () => {
      const color = document.querySelector('input[name = "color-option"]:checked').value;
      const size = button.dataset.value;
      const variant = productObject.variants.find(variant => {
        return variant.options.includes(color) && variant.options.includes(size);
      });

      $.post("/cart/add.js", {
        quantity: 1,
        id: variant.id
      }, onCartChange, "json");
    })
  });
});


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