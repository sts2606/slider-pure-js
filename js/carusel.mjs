function Carusel(slideNumbers) {
  this.slideNumbers = slideNumbers;
  this.sliderContainer = null;
  this.sliderItems = null;
  this.controlsContainer = null;
  this.pausePLayButton = null;
  this.prevButton = null;
  this.nextButton = null;
  this.activeItem = 0;
  this.isSliderMoving = true;
  this.startX = 0;
  this.isDragging = false;
  this.timeoutId = null;
  this.intervalId = null;
}

const caruselPrototype = {
  init() {
    const sliderContainer = document.getElementsByTagName('body')[0];
    const sliderList = document.createElement('ul');
    sliderList.setAttribute('id', 'slider');
    sliderList.setAttribute('class', 'slider');
    sliderContainer.appendChild(sliderList);

    for (let i = 0; i < this.slideNumbers; i++) {
      const viewWidth = sliderContainer.offsetWidth * 0.95;
      const sliderItem = document.createElement('li');
      const img = document.createElement('img');
      img.setAttribute(
        'src',
        `https://picsum.photos/${Math.ceil(viewWidth)}/300?random=${i + 1}`
      );
      sliderItem.appendChild(img);

      if (i === this.activeItem) {
        sliderItem.classList = 'slider-item active';
      } else {
        sliderItem.classList = 'slider-item';
      }
      sliderList.appendChild(sliderItem);
    }

    const controlsContainer = document.createElement('div');
    controlsContainer.classList = 'controls';
    sliderContainer.appendChild(controlsContainer);
    const pausePLayButton = document.createElement('button');
    pausePLayButton.innerText = 'Pause';
    pausePLayButton.setAttribute('id', 'pause-play-button');
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Prev';
    prevButton.setAttribute('id', 'prev-button');
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.setAttribute('id', 'next-button');
    controlsContainer.appendChild(prevButton);
    controlsContainer.appendChild(pausePLayButton);
    controlsContainer.appendChild(nextButton);

    this.sliderItems = document.querySelectorAll('.slider-item');

    this.initListeners();
    this.createAutoSlider();
  },

  initListeners() {
    this.sliderContainer = document.getElementById('slider');
    this.pausePLayButton = document.getElementById('pause-play-button');
    this.prevButton = document.getElementById('prev-button');
    this.nextButton = document.getElementById('next-button');
    this.pausePLayButton.addEventListener(
      'click',
      this.onPausePlayClick.bind(this)
    );
    this.prevButton.addEventListener(
      'click',
      this.onPrevButtonClick.bind(this)
    );
    this.nextButton.addEventListener(
      'click',
      this.onNextButtonClick.bind(this)
    );
    this.sliderContainer.addEventListener(
      'pointerdown',
      this.onPointerDown.bind(this)
    );
  },

  createAutoSlider() {
    this.intervalId = setInterval(this.changeActiveItemAuto.bind(this), 1000);
  },

  toggleActive() {
    this.sliderItems[this.activeItem].classList.toggle('active');
  },

  changeActiveItemAuto() {
    this.toggleActive();

    this.activeItem =
      this.activeItem === this.sliderItems.length - 1 ? 0 : this.activeItem + 1;

    this.toggleActive();
  },

  onPrevButtonClick() {
    this.changeActiveItemManually(
      this.activeItem ? this.activeItem - 1 : this.sliderItems.length - 1
    );
  },

  onNextButtonClick() {
    this.changeActiveItemManually(
      this.activeItem < this.sliderItems.length - 1 ? this.activeItem + 1 : 0
    );
  },

  onPausePlayClick() {
    if (this.isSliderMoving) {
      this.pausePLayButton.innerText = 'Play';
      clearInterval(this.intervalId);
      this.isSliderMoving = false;
    } else {
      this.pausePLayButton.innerText = 'Pause';
      this.intervalId = this.createAutoSlider();
      this.isSliderMoving = true;
    }
  },

  changeActiveItemManually(newActiveItem) {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
    this.toggleActive();
    this.activeItem = newActiveItem;
    this.toggleActive();

    if (this.isSliderMoving) {
      this.timeoutId = setTimeout(() => {
        this.intervalId = this.createAutoSlider();
      }, 3000);
    }
  },

  onPointerDown(event) {
    this.startX = event.clientX;
    this.isDragging = true;

    document.addEventListener('pointermove', this.onMove.bind(this)),
      document.addEventListener('pointerup', this.onUp.bind(this));
  },

  onMove(event) {
    const diff = event.clientX - this.startX;

    if (diff > 5 && this.isDragging) {
      this.changeActiveItemManually(
        this.activeItem ? this.activeItem - 1 : this.sliderItems.length - 1
      );

      this.isDragging = false;
    }

    if (diff < -5 && this.isDragging) {
      this.changeActiveItemManually(
        this.activeItem < this.sliderItems.length - 1 ? this.activeItem + 1 : 0
      );

      this.isDragging = false;
    }
  },

  onUp() {
    document.removeEventListener('pointermove', this.onMove.bind(this)),
      document.removeEventListener('pointerup', this.onUp.bind(this));
  },
};

Carusel.prototype = caruselPrototype;

export { Carusel };
