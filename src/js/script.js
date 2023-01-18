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
    if (e.target.classList.contains('slider-btn--left')) return prevSlide();
    if (e.target.classList.contains('slider-btn--right')) return nextSlide();
  });
}

init();

// POPUP
location.hash = '';
const form = document.querySelector('.sign-form-box');
const message = document.querySelector('.success-message');

window.addEventListener('hashchange', function (e) {
  e.preventDefault();
  if (location.hash === '#sign-form') openForm();
  if (location.hash === '#beta') {
    showMessage("Links on the website doesn't work :)", 1.7);
    location.hash = '#1';
  }
});

const openForm = function () {
  form.classList.add('form-box-active');
  setTimeout(() => {
    document.querySelector('.input-name').focus();
  }, 100);
  form.addEventListener('click', closeFormHandler);
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeForm();
  });
};

const closeForm = function () {
  form.classList.remove('form-box-active');
  location.hash = '#1';
};

const closeFormHandler = function (e) {
  if (
    e.target.classList.contains('btn-close-form') ||
    !e.target.closest('form')
  )
    closeForm();
};

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
