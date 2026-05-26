/**
 * RamArts — Testimonials Slider
 */

function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  if (slider._autoplayInterval) {
    clearInterval(slider._autoplayInterval);
    slider._autoplayInterval = null;
  }

  const slides = slider.querySelectorAll('.testimonial-card');
  let dotsContainer = slider.querySelector('.slider-dots');

  if (slides.length <= 1) return;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
  } else {
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    slider.appendChild(dotsContainer);
  }

  let currentSlide = 0;

  slides.forEach((slide, i) => {
    slide.style.display = i === 0 ? 'block' : 'none';
  });

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides[currentSlide].style.display = 'none';
    currentSlide = index;
    slides[currentSlide].style.display = 'block';

    slider.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startAutoplay() {
    slider._autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(slider._autoplayInterval);
  }

  if (!slider._sliderBound) {
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider._sliderBound = true;
  }

  startAutoplay();
}

document.addEventListener('DOMContentLoaded', initTestimonialsSlider);
window.addEventListener('cms:applied', initTestimonialsSlider);
