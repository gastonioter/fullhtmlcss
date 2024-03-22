const footer = document.querySelector(".footer");
const goupBtn = document.querySelector(".goup");

goupBtn.addEventListener("click", function scrollToTop() {
  scrollTo(0, 0);
});
const footerObserver = new IntersectionObserver(
  function goUp(entries) {
    const [entry] = entries;
    console.log(entry);
    if (entry.isIntersecting) goupBtn.classList.add("goup--visible");
    else goupBtn.classList.remove("goup--visible");
  },
  {
    root: null,
    threshold: 0.9,
  }
);

footerObserver.observe(footer);

document.querySelector("#register").addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  // console.log(e.target.name.value);
  // const languajes = [];
  // e.target.languajes.forEach((checkbox) => {
  //   checkbox.checked ? languajes.push(checkbox.value) : "";
  // });

  // e.target.submit();
  // console.log(e.target.live.formAction);

  const formData = new FormData(document.querySelector("#register"));
  console.log(formData);
}
