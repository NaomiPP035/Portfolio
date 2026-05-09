const tbcThumbButtons = document.querySelectorAll('.tbc-thumb button');
const tbcThumbItems = document.querySelectorAll('.tbc-thumb');
const tbcMainImage = document.getElementById('tbc-main-image');
const tbcMainCaption = document.getElementById('tbc-main-caption');
const tbcArrowRight = document.querySelector('.tbc-arrow-right');
const tbcArrowLeft = document.querySelector('.tbc-arrow-left');
const tbcCarousel = document.querySelector('.tbc-carousel');

let tbcIndex = 0;
let tbcAutoPlay = null;

function setCurrentSlide(index) {
  tbcIndex = (index + tbcThumbButtons.length) % tbcThumbButtons.length;
  const selected = tbcThumbButtons[tbcIndex];

  tbcMainImage.src = selected.dataset.src;
  tbcMainImage.alt = selected.dataset.alt;
  tbcMainCaption.textContent = selected.dataset.caption;

  tbcThumbItems.forEach((item) => item.classList.remove('current-thumb'));
  tbcThumbItems[tbcIndex].classList.add('current-thumb');
}

function nextSlide() {
  setCurrentSlide(tbcIndex + 1);
}

function prevSlide() {
  setCurrentSlide(tbcIndex - 1);
}

function startAutoPlay() {
  if (tbcAutoPlay) return;
  tbcAutoPlay = setInterval(nextSlide, 3500);
}

function stopAutoPlay() {
  clearInterval(tbcAutoPlay);
  tbcAutoPlay = null;
}

if (
  tbcThumbButtons.length > 0 &&
  tbcThumbItems.length > 0 &&
  tbcMainImage &&
  tbcMainCaption &&
  tbcArrowRight &&
  tbcArrowLeft &&
  tbcCarousel
) {
  tbcThumbButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      setCurrentSlide(i);
    });
  });

  tbcArrowRight.addEventListener('click', nextSlide);
  tbcArrowLeft.addEventListener('click', prevSlide);

  tbcCarousel.addEventListener('mouseenter', stopAutoPlay);
  tbcCarousel.addEventListener('mouseleave', startAutoPlay);

  setCurrentSlide(0);
  startAutoPlay();
}
