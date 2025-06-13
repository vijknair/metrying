// Features Carousel Block
export default function decorate(block) {
  // Collect all feature items (each direct child div)
  const items = Array.from(block.children);

  // Create carousel container
  const carousel = document.createElement('div');
  carousel.className = 'features-carousel-carousel';

  // Create slides wrapper
  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'features-carousel-slides';

  // Move each item into a slide
  items.forEach((item, idx) => {
    // Extract image (picture), title (strong), and description
    const picture = item.querySelector('picture');
    let title = '';
    let description = '';
    const strong = item.querySelector('strong');
    if (strong) {
      title = strong.textContent;
      // Remove strong from its parent to avoid duplication
      strong.parentNode.removeChild(strong);
    }
    // The rest of the text content (excluding strong)
    const paragraphs = Array.from(item.querySelectorAll('p'));
    description = paragraphs.map(p => p.textContent).join(' ');

    // Slide layout: text left, image right
    const slide = document.createElement('div');
    slide.className = 'features-carousel-slide';
    if (idx === 0) slide.classList.add('active');

    const slideGrid = document.createElement('div');
    slideGrid.className = 'features-carousel-slide-grid';

    // Text column
    const textCol = document.createElement('div');
    textCol.className = 'features-carousel-slide-text';
    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'features-carousel-slide-title';
      titleEl.textContent = title;
      textCol.appendChild(titleEl);
    }
    if (description) {
      const descEl = document.createElement('div');
      descEl.className = 'features-carousel-slide-desc';
      descEl.textContent = description;
      textCol.appendChild(descEl);
    }

    // Image column
    const imageCol = document.createElement('div');
    imageCol.className = 'features-carousel-slide-image';
    if (picture) imageCol.appendChild(picture.cloneNode(true));

    // Add nav buttons container (will be positioned absolutely in CSS)
    const navContainer = document.createElement('div');
    navContainer.className = 'features-carousel-nav-container';
    imageCol.appendChild(navContainer);

    slideGrid.appendChild(textCol);
    slideGrid.appendChild(imageCol);
    slide.appendChild(slideGrid);
    slidesWrapper.appendChild(slide);
  });

  // Carousel navigation (created once, but moved into each slide's image area)
  const prevBtn = document.createElement('button');
  prevBtn.className = 'features-carousel-nav features-carousel-prev';
  prevBtn.setAttribute('aria-label', 'Previous feature');
  prevBtn.innerHTML = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'features-carousel-nav features-carousel-next';
  nextBtn.setAttribute('aria-label', 'Next feature');
  nextBtn.innerHTML = '›';

  // Add slides to carousel
  carousel.appendChild(slidesWrapper);

  // Replace block content
  block.textContent = '';
  block.appendChild(carousel);

  // Move nav buttons into the nav container of the active slide
  function updateNavPosition() {
    const activeSlide = slidesWrapper.querySelector('.features-carousel-slide.active');
    if (activeSlide) {
      const navContainer = activeSlide.querySelector('.features-carousel-nav-container');
      if (navContainer) {
        navContainer.innerHTML = '';
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(nextBtn);
      }
    }
  }

  // Carousel logic
  let current = 0;
  const slides = slidesWrapper.querySelectorAll('.features-carousel-slide');
  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    updateNavPosition();
  }
  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  // Initial nav position
  updateNavPosition();
} 