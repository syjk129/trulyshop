import $ from "jquery";

const decrementButtons = document.getElementsByClassName("cart-decrement");
for (let element of decrementButtons) {
  element.onclick = () => changeItem(element.dataset.id, parseInt(element.dataset.quantity) - 1);
}

const incrementButtons = document.getElementsByClassName("cart-increment");
for (let element of incrementButtons) {
  element.onclick = () => changeItem(element.dataset.id, parseInt(element.dataset.quantity) + 1);
}

// Remove
const removeButtons = document.getElementsByClassName("cart-remove");
for (let element of removeButtons) {
  element.onclick = () => changeItem(element.dataset.id, 0);
}

function onCartChange() {
  window.location.href = "/cart";
}

function changeItem(itemId, quantity) {
  console.log("yo");

  $.post("/cart/change.js", {
    quantity: quantity,
    id: itemId
  }, onCartChange, "json");
}

function clearCart() {
  console.log("clear");
}