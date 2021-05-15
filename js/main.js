//jshint esversion:6
AOS.init();
const backToTopButton = document.querySelector("#scroll-top-btn");
window.addEventListener("scroll", showBtn);

function showBtn() {
  if (window.pageYOffset > 850) {
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  } else {
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", scrollPage);
function scrollPage() {
  window.scrollTo(0, 0);
}
