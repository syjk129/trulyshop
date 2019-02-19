const modals = document.getElementsByClassName("modal");
for (let i = 0; i < modals.length; i++) {
  const modalContent = modals[i].getElementsByClassName("modal-content");
  if (modalContent && modalContent.length > 0) {
    modals[i].onclick = (evt) => {
      if (!modalContent[0].contains(evt.target)) {
        modals[i].style.display = "none";
      }
    }
  }
}