import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  //if (block.querySelector('.hero-container')) return;

  // Create hero container
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  // Create hero wrapper
  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-wrapper';

  // Create hero content
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  // Create hero inner screen (for the image)
  const heroInnerScreen = document.createElement('div');
  heroInnerScreen.className = 'hero-inner-screen';

  // Process the hero block structure
  const heroDivs = block.querySelectorAll('div.hero > div');
  
  heroDivs.forEach((div) => {
    // Check for text content (title)
    const textParagraph = div.querySelector('p');
    if (textParagraph && !textParagraph.querySelector('picture')) {
      // This is the title text
      const heroTitle = document.createElement('div');
      heroTitle.className = 'hero-title';
      const titleElement = document.createElement('h1');
      titleElement.textContent = textParagraph.textContent;
      heroTitle.appendChild(titleElement);
      heroContent.appendChild(heroTitle);
    }
    
    // Check for picture (inner screen image)
    const picture = div.querySelector('picture');
    if (picture) {
      // Move the picture to hero inner screen
      heroInnerScreen.appendChild(picture.cloneNode(true));
    }
  });

  // Assemble the hero structure: content first, then inner screen
  heroWrapper.appendChild(heroContent);
  heroWrapper.appendChild(heroInnerScreen);
  heroContainer.appendChild(heroWrapper);

  // Clear and replace block content
  block.textContent = '';
  block.appendChild(heroContainer);
}
