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

  const modalClose = modals[i].getElementsByClassName("modal-close");
  if (modalClose && modalClose.length > 0) {
    for (let j = 0; j < modalClose.length; j++) {
      modalClose[j].onclick = () => {
        modals[i].style.display = "none";
      }
    }
  }
}