import $ from "jquery";

$(document).ready(() => {
  const productCards = document.getElementsByClassName("product-card-container");
 
  for (let i = 0; i < productCards.length; i++) {
    const productCardImg = productCards[i].getElementsByClassName("product-card-image");
    const productCampaignImg = $('.product-campaign-img:visible', productCards[i])[0];

    if (productCardImg && productCampaignImg && productCampaignImg.classList.contains("tablet-up")) {
      productCampaignImg.style.height = `${productCardImg[0].getBoundingClientRect().height}px`;
    }

    $("[data-product-card-color-swatch]", productCards[i]).each((index, colorSwatch) => {
      // Add Event Listener to change product image on click
      updateProductCardImageFromVariant(productCards[i]);

      $(colorSwatch).change((evt) => {
        evt.preventDefault();
        updateProductCardImageFromVariant(productCards[i]);
      });
    });
  }
});

function updateProductCardImageFromVariant(productCard) {
  const currentVariant = productCard.querySelector("input[data-product-card-color-swatch]:checked");
  if (!currentVariant || !currentVariant.value) {
    return;    
  }

  const allImages = productCard.getElementsByClassName("product-card-image-flip");
  for (let i = 0; i < allImages.length; i++) {
    if (allImages[i].dataset.flipColor == currentVariant.value) {
      allImages[i].style.display = "block";
    } else {
      allImages[i].style.display = "none";
    }
  }
}