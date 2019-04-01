import $ from "jquery";

$(document).ready(() => {
  const productCards = document.getElementsByClassName("product-card-container");
 
  for (let i = 0; i < productCards.length; i++) {
    const productCardImg = productCards[i].getElementsByClassName("product-card-img");
    const productCampaignImgs = productCards[i].getElementsByClassName("product-campaign-img");
    let productCampaignImg;

    for (let j = 0; j < productCampaignImgs.length; j++) {
      if ($(productCampaignImgs[j]).is(":visible")) {
        productCampaignImg = productCampaignImgs[j];
      }
    }

    if (productCardImg && productCampaignImg && productCampaignImg.classList.contains("desktop")) {
      productCampaignImg.style.height = `${productCardImg[0].getBoundingClientRect().height}px`;
    }
  }
});