import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Get the first div which contains the content
  const contentDiv = block.querySelector(':scope > div');
  if (!contentDiv) return;

  // Get the inner div which contains H1 and picture
  const innerDiv = contentDiv.querySelector(':scope > div');
  if (!innerDiv) return;

  // Find H1 and picture elements
  const h1 = innerDiv.querySelector('h1');
  const picture = innerDiv.querySelector('picture');

  if (!h1 || !picture) return;

  // Create hero content
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  // Create title section
  const titleSection = document.createElement('div');
  titleSection.className = 'hero-title-section';
  titleSection.appendChild(h1);

  // Create hero image section
  const imageSection = document.createElement('div');
  imageSection.className = 'hero-image-section';

  // Create device mockup container
  const deviceContainer = document.createElement('div');
  deviceContainer.className = 'hero-device-container';

  // Optimize the picture
  const optimizedPicture = createOptimizedPicture(
    picture.querySelector('img').src,
    picture.querySelector('img').alt || '',
    false,
    [{ width: '2000' }, { width: '1200' }, { width: '750' }]
  );

  // Create inner screen
  const innerScreen = document.createElement('div');
  innerScreen.className = 'hero-inner-screen';
  innerScreen.appendChild(optimizedPicture);

  // Assemble the structure
  deviceContainer.appendChild(innerScreen);
  imageSection.appendChild(deviceContainer);
  
  heroContent.appendChild(titleSection);
  heroContent.appendChild(imageSection);

  // Clear and replace block content
  block.textContent = '';
  block.appendChild(heroContent);
}
