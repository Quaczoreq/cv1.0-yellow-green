document.querySelectorAll('.read-more-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    if (!card) {
      return;
    }

    const expanded = card.classList.toggle('expanded');
    button.textContent = expanded ? 'Read Less' : 'Read More';
  });
});

document.querySelectorAll('.mini-gallery').forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll('.mini-slide'));
  if (slides.length === 0) {
    return;
  }

  const dotsContainer = gallery.querySelector('.mini-gallery-dots');
  const dots = [];

  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'mini-gallery-dot';
      if (index === 0) {
        dot.classList.add('is-active');
      }
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (activeIndex < 0) {
    activeIndex = 0;
    slides[0].classList.add('is-active');
  }

  const setActiveSlide = (nextIndex) => {
    slides[activeIndex].classList.remove('is-active');
    if (dots[activeIndex]) {
      dots[activeIndex].classList.remove('is-active');
    }

    activeIndex = (nextIndex + slides.length) % slides.length;

    slides[activeIndex].classList.add('is-active');
    if (dots[activeIndex]) {
      dots[activeIndex].classList.add('is-active');
    }
  };

  gallery.querySelectorAll('.mini-gallery-arrow').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      if (action === 'prev') {
        setActiveSlide(activeIndex - 1);
      } else {
        setActiveSlide(activeIndex + 1);
      }
    });
  });
});
