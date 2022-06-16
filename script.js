`use strict`;

const closeModal = document.querySelector(".btn__close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openAcc1 = document.querySelector(".navbar-openacc");
const openAcc2 = document.querySelector(".sign-up-button");
const lazyImages = document.querySelectorAll("img[data-hqimage]");
const sections = document.querySelectorAll(".section");
const navBar = document.querySelector(".navbar-items");
const readMore = document.querySelector(".header-main-read-more");
const operations = document.querySelector(".operations__tab-container");
const sectionSlider = document.querySelector(".section3-slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let lastOperationClicked = [
  document.querySelector(".operations__tab--1"),
  document.querySelector(".operations__content--1"),
];

function overlayToggler(a) {
  // why does this not work??
  //   modal.classList.toggle("hidden");
  //   overlay.classList.toggle("hidden");
  if (a === 1) {
    modal.style.opacity = 0;
    overlay.style.opacity = 0;
    // listen, monkey brain, we use this so that it only truly makes them hidden once their transition is finished (aka 0.1s or 100ms);
    setTimeout(function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }, 100);
  } else {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    // okay so, monkey brain, we do this because we want it to transition from 0 to 1 opacity. However, it doesnt work if you just add those style properties, you have to make it WAIT(probably because the above methods are asynchronous)
    setTimeout(function () {
      modal.style.opacity = 1;
      overlay.style.opacity = 1;
    }, 1);
  }
}

closeModal.addEventListener("click", function () {
  overlayToggler(1);
});

overlay.addEventListener("click", function () {
  overlayToggler(1);
});

openAcc1.addEventListener("click", function () {
  overlayToggler(2);
});

openAcc1.addEventListener("click", function () {
  overlayToggler(2);
});

openAcc2.addEventListener("click", function () {
  overlayToggler(2);
});

openAcc2.addEventListener("click", function () {
  overlayToggler(2);
});

function loadImg(e, observer) {
  e.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.hqimage;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  });
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

function loadSection(e, observer) {
  e.forEach((section) => {
    if (!section.isIntersecting) return;
    section.target.style.animation = "sectioner 0.5s linear";

    observer.unobserve(section.target);
  });
}

const sectionObserver = new IntersectionObserver(loadSection, {
  root: null,
  threshold: 0,
});

lazyImages.forEach((img) => imgObserver.observe(img));

sections.forEach((section) => sectionObserver.observe(section));

navBar.addEventListener("click", function (e) {
  if (e.target.classList.contains("navbar-item")) {
    const ele = e.target.classList[1].slice(7);
    const element = document.querySelector(`#section--${ele}`);
    element.scrollIntoView({ behavior: "smooth" });
  }
});

readMore.addEventListener("click", function () {
  document
    .querySelector("#section--features")
    .scrollIntoView({ behavior: "smooth" });
});

operations.addEventListener("click", function (e) {
  if (e.target.classList.contains("operations__tab")) {
    // store the last active TAB element and CONTENT element as a variable(lastOperationClicked 0 and 1 respectively)
    // remove the active class from the last active tab element
    lastOperationClicked[0].classList.remove("operations__tab--active");
    // add the active class to the CLICKED element
    e.target.classList.add("operations__tab--active");
    // add the new active element to the variable so it can be removed for the next time
    lastOperationClicked[0] = e.target;

    // the same procedure
    lastOperationClicked[1].classList.remove("operations__content--active");

    // to get the content tab we want, we first get the class of the tab element which has the number identified at the end eg. operations__tab--1 or 2 or 3, and we use that to get the correct section
    // then we do the same procedure to the element as we did with the tab element
    const identifier = e.target.classList[2].slice(17);
    document
      .querySelector(`.operations__content--${identifier}`)
      .classList.add("operations__content--active");
    lastOperationClicked[1] = document.querySelector(
      `.operations__content--${identifier}`
    );
    console.log(lastOperationClicked);
  }
});

let counter = 0;
document;
const slideWidth = document.querySelector(".slide").clientWidth;

function checkDots() {
  document.querySelectorAll(".dots__dot").forEach((dot, i) => {
    dot.classList.remove("dots__dot--active");
    if (counter === i) {
      dot.classList.add("dots__dot--active");
    }
  });
}

btnRight.addEventListener("click", function () {
  console.log(sectionSlider.style.transform);
  counter === 2 ? (counter = 0) : counter++;
  sectionSlider.style.transform = `translateX(-${counter * slideWidth}px)`;
  checkDots();
});

btnLeft.addEventListener("click", function () {
  counter === 0 ? (counter = 2) : counter--;
  sectionSlider.style.transform = `translateX(-${counter * slideWidth}px)`;
  checkDots();
});

const dots = document.querySelector(".dots");

document.querySelectorAll(".slide").forEach((slider, i) => {
  const element =
    counter === i
      ? `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
      : `<button class="dots__dot" data-slide="${i}"></button>`;
  dots.insertAdjacentHTML("beforeend", element);
});

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    console.log([e.target.dataset.slide, counter]);
    counter = Number(e.target.dataset.slide);
    sectionSlider.style.transform = `translateX(-${counter * slideWidth}px)`;
    checkDots();
  }
});
