const footer = document.querySelector(".footer");
const goupBtn = document.querySelector(".goup");
const registerForm = document.querySelector("#register");
const registerBtn = document.querySelector(".register-btn");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".modal__close");
const requiredInputs = document.querySelectorAll(
  "input[required], select[required]"
);

requiredInputs.forEach((inp) => {
  inp.previousElementSibling.classList.add("label--required");
});

registerForm.addEventListener("focusout", handleValidationInputs);

registerForm.addEventListener("submit", handleSubmit);

closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("click", handleClickOutside, true);
registerBtn.addEventListener("click", openModal);

goupBtn.addEventListener("click", function scrollToTop() {
  scrollTo(0, 0);
});

const footerObserver = new IntersectionObserver(
  function goUp(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) goupBtn.classList.add("goup--visible");
    else goupBtn.classList.remove("goup--visible");
  },
  {
    root: null,
    threshold: 0.9,
  }
);

footerObserver.observe(footer);

function handleSubmit(e) {
  e.preventDefault();
}

function openModal(e) {
  modal.setAttribute("aria-hidden", false);
}

function closeModal(e) {
  const target = e.target;
  if (target.closest(".modal__close")) modal.setAttribute("aria-hidden", true);
  else return;
}

function handleClickOutside(e) {
  const target = e.target;

  if (!modal.firstElementChild.contains(target))
    return modal.setAttribute("aria-hidden", true);
}

function handleValidationInputs(e) {
  const { valid } = e.target.validity;
  const { validationMessage } = e.target;
  
  if (!valid && validationMessage) {
    console.log("invalid input");
    e.target.nextElementSibling.textContent = validationMessage;
  } else {
    e.target.nextElementSibling.textContent = "";
  }
  console.log(valid, validationMessage);
}
