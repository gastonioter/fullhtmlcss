// SLIDER

const carouseEl = document.querySelector(".carousel");
const tabEl = document.querySelector(".tabbed");

const carousel = new Slider(carouseEl);
carousel.init();

function Slider(carouselEl) {
  const slides = carouselEl.querySelectorAll(".carousel__slide");
  let currSlideId = 0;
  const lastSlide = slides.length;
  const dotsContainer = carouselEl.querySelector(".carousel__dots");

  function goToSlide(slideId) {
    currSlideId = slideId;
    // slideId : 0

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - slideId) * 150}%)`;
      slideId == i ? (slide.style.opacity = 1) : (slide.style.opacity = 0);
    });

    Array.from(dotsContainer.children).forEach((dot) =>
      dot.classList.remove("active")
    );
    // console.log(dotsContainer.childNodes);
    Array.from(dotsContainer.children)
      .find((dot) => dot.dataset.goto == slideId)
      .classList.add("active");
  }

  function init() {
    function setSlideIndex() {
      slides.forEach((slide, index) => {
        slide.setAttribute("data-slide", index);
      });
    }

    dotsContainer.addEventListener("click", (e) => {
      if (!e.target.classList.contains("carousel__dot")) return;

      const index = e.target.dataset.goto;
      goToSlide(index);
    });

    setSlideIndex();

    createDots();

    goToSlide(0);

    setInterval(function goNext() {
      if (currSlideId == lastSlide - 1) return goToSlide(0);
      goToSlide(currSlideId + 1);
    }, 2000);
  }

  function createDots() {
    dotsContainer.innerHTML = createHTMLDots();

    function createHTMLDots() {
      return Array.from(slides)
        .map(
          (_, index) => `<li class="carousel__dot" data-goto='${index}'> </li>`
        )
        .join("");
    }
  }

  return { init };
}

Tabbed();
function Tabbed(tabEl) {
  const tabsContainer = document.querySelector(".tabbed__tabs");
  const tabContentList = document.querySelectorAll(".tabbed__content");

  init();

  function init() {
    tabsContainer.addEventListener("click", handleTabClick);
  }

  function openTabContent(tabId) {
    tabContentList.forEach((tab) =>
      tab.dataset.content == tabId
        ? tab.setAttribute("aria-hidden", false)
        : tab.setAttribute("aria-hidden", true)
    );

    Array.from(tabsContainer.children).forEach((tab) => {
      tab.dataset.contentId == tabId
        ? tab.classList.add("active")
        : tab.classList.remove("active");
    });
  }

  function handleTabClick(e) {
    if (!e.target.closest(".tabbed__tab")) return;
    const clicked = e.target.closest(".tabbed__tab");

    const tabId = clicked.dataset.contentId;
    openTabContent(tabId);
  }
}
