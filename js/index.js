const slider = document.getElementById('slider');
const sliderItems = document.querySelectorAll('.slider-item');
const pausePLayButton = document.getElementById('pause-play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let activeItem = 0;
let isSliderMoving = true;

function toggleActive() {
  sliderItems[activeItem].classList.toggle('active');
}

function createAutoSlider() {
  setInterval(changeActiveItemAuto, 2000);
}

function changeActiveItemAuto() {
  toggleActive();
  if (activeItem === sliderItems.length - 1) {
    activeItem = 0;
  } else {
    activeItem++;
  }
  toggleActive();
}

function onPrevButtonClick() {
  changeActiveItemManually(
    activeItem ? activeItem - 1 : sliderItems.length - 1
  );
}

function onNextButtonClick() {
  changeActiveItemManually(
    activeItem < sliderItems.length - 1 ? activeItem + 1 : 0
  );
}

let intervalId = createAutoSlider();

function onPausePlayClick() {
  if (isSliderMoving) {
    pausePLayButton.innerText = 'Play';
    clearInterval(intervalId);
    isSliderMoving = false;
  } else {
    pausePLayButton.innerText = 'Pause';
    intervalId = createAutoSlider();
    isSliderMoving = true;
  }
}

function changeActiveItemManually(newActiveItem) {
  clearInterval(intervalId);
  toggleActive();
  activeItem = newActiveItem;
  toggleActive();

  if (isSliderMoving) {
    setTimeout(() => createAutoSlider(), 3000);
  }
}

pausePLayButton.addEventListener('click', onPausePlayClick);
prevButton.addEventListener('click', onPrevButtonClick);
nextButton.addEventListener('click', onNextButtonClick);
