// SLIDER

const carouseEl = document.querySelector(".carousel");

let carousel = Slider(carouseEl);

function Slider(carouselEl) {
  const slides = carouselEl.querySelectorAll(".carousel__slide");

  const dotsContainer = carouselEl.querySelector(".carousel__dots");

  function goToSlide(index) {
    // index : 0

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 150}%)`;
      if (index == i) slide.style.opacity = 1;
    });

    Array.from(dotsContainer.children).forEach((dot) =>
      dot.classList.remove("active")
    );
    // console.log(dotsContainer.childNodes);
    Array.from(dotsContainer.children)
      .find((dot) => dot.dataset.goto == index)
      .classList.add("active");
  }

  function init() {
    console.log("init carousel");

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
  }

  function createDots() {
    console.log("create dots");

    dotsContainer.innerHTML = createHTMLDots();

    function createHTMLDots() {
      return Array.from(slides)
        .map(
          (slide, index) =>
            `<li class="carousel__dot" data-goto='${index}'> </li>`
        )
        .join("");
    }
  }

  init();
}
