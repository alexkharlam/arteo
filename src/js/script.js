const navMenu = document.querySelector('.header-box');

// SLIDER
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider-btn--left');
const btnRight = document.querySelector('.slider-btn--right');

let curSlide = 0;
const gotoSlide = function (num) {
  slides.forEach(
    (slide, idx) =>
      (slide.style.transform = `translateX(${(idx - num) * 100}%)`)
  );
};

const prevSlide = function () {
  if (curSlide === 0) {
    gotoSlide(slides.length - 1);
    curSlide = slides.length - 1;
  } else {
    --curSlide;
    gotoSlide(curSlide);
  }
};

const nextSlide = function () {
  if (curSlide === slides.length - 1) {
    gotoSlide(0);
    curSlide = 0;
  } else {
    ++curSlide;
    gotoSlide(curSlide);
  }
};

function init() {
  gotoSlide(curSlide);
  slider.addEventListener('click', function (e) {
    if (e.target.closest('.slider-btn--left')) return prevSlide();
    if (e.target.closest('.slider-btn--right')) return nextSlide();
  });
}

init();

// POPUP
location.hash = '';
const form = document.querySelector('.sign-form-box');
const message = document.querySelector('.success-message');
const btnCloseForm = document.querySelector('.btn-close-form');

window.addEventListener('hashchange', function (e) {
  e.preventDefault();
  if (location.hash === '#sign-form') openForm();
  if (location.hash === '#beta') {
    showMessage("Links on the website doesn't work :)", 1.7);
    location.hash = '#1';
  }

  navMenu.classList.remove('header-box-active');
});

const openForm = function () {
  // opening form
  form.classList.add('form-box-active');
  // focusing on the first input
  setTimeout(() => {
    document.querySelector('.input-name').focus();
  }, 100);
  // Closing form when close btn clicked
  btnCloseForm.addEventListener('click', function (e) {
    e.preventDefault();
    closeForm();
  });
  // listening for the event of clicking outside of form
  form.addEventListener('click', function (e) {
    if (!e.target.closest('form')) closeForm();
  });
  // Listening for the event of clicking esc and closing form
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeForm();
  });
};

// closes form
const closeForm = function () {
  form.classList.remove('form-box-active');
  location.hash = '#1';
};

// listens to the submit
document.querySelector('.popup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  e.target.reset();
  closeForm();
  showMessage('Thank you! We will contact you shortly 😉', 3);
});

const showMessage = function (text, sec) {
  message.textContent = text;
  message.classList.add('success-message--active');
  setTimeout(() => {
    message.classList.remove('success-message--active');
  }, 1000 * sec);
};

// form
document.querySelector('.form-state').addEventListener('submit', function (e) {
  e.preventDefault();
  e.target.reset();
  showMessage('Thank you! We will contact you shortly 😉', 3);
});

// FAQ
const questionsContainer = document.querySelector('.faq-box');
// const questions = document.querySelectorAll('.question-text');

questionsContainer.addEventListener('click', function (e) {
  if (!e.target.closest('.question-text')) return;

  const explanation = e.target
    .closest('.question')
    .querySelector('.explanation');

  explanation.classList.toggle('explanation-active');
});

// mobile nav
const btnNav = document.querySelector('.toggle-nav');

btnNav.addEventListener('click', function (e) {
  e.preventDefault();
  navMenu.classList.toggle('header-box-active');
});

// smooth scrolling
const navMain = document.querySelectorAll('.scrolling-nav');

navMain.forEach(navMain =>
  navMain.addEventListener('click', function (e) {
    if (e.target.classList.contains('scrolling-link')) {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  })
);

// reveal sections TODO: FIX
// const allSections = document.querySelectorAll('.reveal');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove('reveal-hidden');
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   treshold: 0.1,
// });

// allSections.forEach(section => {
//   section.classList.add('reveal-hidden');
//   sectionObserver.observe(section);
// });

// Hero elements revealing
const headingPrimary = document.querySelector('.heading-primary');
headingPrimary.classList.add('heading-primary-hidden');
const image = document.querySelector('.hero-img-box');
image.classList.add('image-hidden');

window.addEventListener('load', function (e) {
  image.classList.remove('image-hidden');
  headingPrimary.classList.remove('heading-primary-hidden');
});
