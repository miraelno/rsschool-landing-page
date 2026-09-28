const sliderTrack = document.querySelector('.slider__track');
const sliderPhotos = document.querySelectorAll('.slider__slide');
const backButton = document.querySelector('#slider_button_prev');
const nextButton = document.querySelector('#slider_button_next');
const sliderDots = document.querySelectorAll('.slider__dot');

let currentSlideIndex = 0;

function showSlide(index) {
    sliderTrack.style.transform = `translateX(-${100 * index}%)`;
    sliderDots.forEach((element, i) => {
        element.classList.toggle('slider__dot--active', i === index);
    });
}

backButton.addEventListener('click', () => {
    currentSlideIndex =
        (currentSlideIndex - 1 + sliderPhotos.length) % sliderPhotos.length;
    showSlide(currentSlideIndex);
});

nextButton.addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex + 1) % sliderPhotos.length;
    showSlide(currentSlideIndex);
});

sliderDots.forEach((element, index) => {
    element.addEventListener('click', () => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    });
});
