// SELECT HTML ELEMENTS
const headerEl = document.querySelector(".header");
const navListEl = document.querySelector(".nav__items");
const navLinks = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll("section");
const mainBtn = document.querySelector(".main__button");
const contactSection = document.querySelector(".contact");

// VARIABLES
const { top: topPositionSection } = contactSection.getBoundingClientRect();

// INTERSECTION OBSERVER SETTINGS

const sectionsObsOptions = {
  root: null, // viewport
  threshold: 0.4,
};

const mainBtnObsOptions = {
  root: null,
  threshold: 0,
};

function setLinkActive({ id }) {
  //id: section id attribute

  navLinks.forEach((link) => link.classList.remove("active"));

  const activeLink = Array.from(navLinks).find(
    (link) => link.attributes.href.value.split("#").at(1) == id
  );

  if (!activeLink) return;
  activeLink.classList.add("active");
}

function showSection(section) {
  section.classList.remove("section--hidden");
}

function handleActiveLink(entries, observer) {
  entries.forEach((entry) => {
    //console.log(entry);
    if (entry.isIntersecting) {
      const { target } = entry;
      setLinkActive(target);
      showSection(target);
    }
  });
}

const sectionsObserver = new IntersectionObserver(
  handleActiveLink,
  sectionsObsOptions
);

sections.forEach((section) => sectionsObserver.observe(section));

// ADD EVENTS LISTENERS
mainBtn.addEventListener("click", moveToContact);
document.addEventListener("scroll", handleScroll);
navListEl.addEventListener("click", handleNavigationClick);

// EVENT HANDLERS

function moveToContact() {
  scrollTo(scrollX, scrollY + topPositionSection);
}

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
  if (scrollY > 72) headerEl.classList.add("scrolled");
  else headerEl.classList.remove("scrolled");
}
