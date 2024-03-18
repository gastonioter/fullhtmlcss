const headerEl = document.querySelector(".header");

document.addEventListener("scroll", handleScroll);

function handleScroll() {
  console.log(scrollY);
  if(scrollY > 72) headerEl.classList.add('header--scrolled')
  else headerEl.classList.remove("header--scrolled");
}
