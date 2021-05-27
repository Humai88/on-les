//jshint esversion:6

const article = document.querySelector(".article"),
  pageContent = document.querySelector("#content"),
  articleTitle = document.querySelector(".article-title"),
  articleImg = document.querySelector(".article-img"),
  articleContent = document.querySelector(".article-content"),
  closeTrigger = document.querySelector("[data-close]"),
  articleLink = document.querySelector(".download-link"),
  wrapper = document.querySelector(".content-wrapper");

window.addEventListener("load", createCards);
function createCards() {
  let prevImg = [],
    titles = [],
    id = [];
  const request = new XMLHttpRequest();
  request.open("GET", "json/craft.json");
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.send();

  request.addEventListener("readystatechange", function () {
    if (request.readyState === 4 && request.status === 200) {
      const data = JSON.parse(request.response);
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        id.push(key);
        titles.push(data[key].prevTitle);
        prevImg.push(data[key].prevImage);

        const cardWrapper = document.createElement("div"),
          cardBorder = document.createElement("div"),
          cardBody = document.createElement("div"),
          cardImg = document.createElement("img"),
          cardTitle = document.createElement("h5");

        cardWrapper.classList.add("col-lg-4", "card-wrapper");
        cardBorder.classList.add("card", "border-0");
        cardBody.classList.add("card-body");
        cardImg.classList.add("card-img-top");
        cardTitle.classList.add("card-title");
        cardTitle.setAttribute("data-open", "");
        wrapper.append(cardWrapper);
        cardWrapper.append(cardBorder);
        cardBorder.append(cardBody);
        cardBody.append(cardImg);
        cardBody.append(cardTitle);

        titles.forEach((elem) => {
          cardTitle.innerHTML = elem;
        });
        prevImg.forEach((elem) => {
          cardImg.src = elem;
        });
        id.forEach((elem) => {
          cardTitle.id = elem;
        });
        let openTriggers = document.querySelectorAll(".card-title");
        openTriggers.forEach((elem) => {
          elem.addEventListener("click", getData);
        });

        function getData(e) {
          let target = e.target;
          article.classList.remove("hide");
          article.classList.add("show");
          pageContent.classList.remove("show");
          pageContent.classList.add("hide");

          for (i = 0; i < keys.length; i++) {
            const key = keys[i];

            if (target.id === key) {
              articleTitle.innerHTML = data[key].title;
              articleImg.src = data[key].image;
              articleLink.href = data[key].link;
              articleContent.innerHTML = data[key].content;
            }
          }
          window.scrollTo(0, 0);
        }

        closeTrigger.addEventListener("click", () => {
          article.classList.remove("show");
          article.classList.add("hide");
          pageContent.classList.remove("hide");
          pageContent.classList.add("show");
        });
      }
    }
  });
}

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
