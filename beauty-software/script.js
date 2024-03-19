const headerEl = document.querySelector(".header");
const navListEl = document.querySelector(".nav__items");
const sections = document.querySelectorAll("section");
document.addEventListener("scroll", handleScroll);
navListEl.addEventListener("click", handleNavigationClick);

function handleNavigationClick(e) {
  e.preventDefault();
  const link = e.target;
  if (!link.classList.contains("nav__link")) return;

  const { top } = document
    .querySelector(`section.${link.attributes.href.value.split("#").at(1)}`)
    .getBoundingClientRect();

  scrollTo(scrollX, scrollY + top - 72);
}
function handleScroll() {
  if (scrollY > 72) headerEl.classList.add("header--scrolled");
  else headerEl.classList.remove("header--scrolled");
}
