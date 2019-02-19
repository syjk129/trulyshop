import $ from 'jquery';
const addNewAddressBtn = document.getElementById("add-new-address");
const addNewAddressModal = document.getElementById("address-modal");

if (addNewAddressBtn) {
  addNewAddressBtn.onclick = () => {
    addNewAddressModal.style.display = "block";
  }
}
