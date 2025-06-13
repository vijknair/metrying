# Features Carousel Block

## Overview
This block implements a modern, accessible carousel for showcasing features, based on the Figma design and the backend markup structure.

## Expected Markup
The backend will provide markup like:

```html
<div class="features-carousel block">
  <div>
    <div>
      <picture>...</picture>
    </div>
    <div>
      <p><strong>Feature Title</strong></p>
      <p>Feature description</p>
    </div>
  </div>
  <!-- More feature items -->
</div>
```

## Decoration Logic
- Each direct child `<div>` of the block is treated as a carousel slide.
- Each slide contains an image and text content.
- Carousel navigation buttons (prev/next) are added.
- Only one slide is visible at a time; navigation updates the visible slide.

## Features
- Keyboard and mouse accessible navigation
- Responsive and visually appealing
- Easy to extend for more advanced carousel features

## Usage
Just add the block markup as above. The decorator will handle the rest. 