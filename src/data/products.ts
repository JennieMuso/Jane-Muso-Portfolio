// Product shape and original content used by the one-time Sanity import.
export type Product = {
  slug: string;
  name: string;
  category: 'component' | 'template';
  summary: string;
  description: string[];
  features: string[];
  coverImage?: string;
  coverAlt?: string;
  previewImage?: string;
  previewMode?: 'embed' | 'image';
  gallery?: { src: string; alt: string }[];
  framerUrl: string;
  previewUrl: string;
  checkoutUrl: string;
  price: string;
  visual?: 'macula' | 'onanni';
};

// Only products with verified preview and checkout URLs are published here.
export const products: Product[] = [
  {
    slug: 'onanni-villa', name: 'Onanni Villa', category: 'template',
    summary: 'A visual-first Framer website template for a villa story.',
    description: [
      'Onanni Villa is a Framer website template for presenting a villa through considered imagery and an inviting digital experience.',
      'Explore the live website before deciding if its visual direction is right for your property project.'
    ],
    features: ['Framer website template', 'Live website preview'],
    coverImage: '/assets/shop/onanni-villa.png',
    coverAlt: 'Modern villa living room with tall windows and warm wood finishes',
    framerUrl: 'https://www.framer.com/marketplace/templates/onanni-villa/',
    previewUrl: 'https://onanni-properties.framer.website/',
    checkoutUrl: 'https://janemuso.lemonsqueezy.com/checkout/buy/57cc3f1e-c9ea-461c-b27d-51bbc366d69e',
    price: '$129'
  },
  {
    slug: 'macula-reveal', name: 'Macula Reveal', category: 'component',
    summary: 'A cursor-following reveal that brings hidden imagery into view.',
    description: [
      'Macula Reveal is a Framer component built around a cursor-following smudge reveal. It lets visitors uncover imagery as they move across the page.',
      'Open the live preview to see the motion in context before purchasing the component.'
    ],
    features: ['Framer component', 'Live interaction preview'],
    coverImage: '/assets/shop/macula-reveal.png',
    coverAlt: 'Burgundy Macula reveal artwork with an organic image mask',
    framerUrl: 'https://www.framer.com/marketplace/components/macula-reveal/',
    previewUrl: 'https://macula-reveal.framer.website/',
    checkoutUrl: 'https://janemuso.lemonsqueezy.com/checkout/buy/c8e97775-c59a-4c6f-913f-3d38bed3fb85',
    price: '$12'
  },
  {
    slug: 'orbita-images', name: 'Orbita Images', category: 'component',
    summary: 'A tilted ring of images that drifts, responds to scrolling, and focuses on hover.',
    description: [
      'Orbita arranges your images in a tilted oval around a centered title or logo. The ring turns slowly on its own. Scrolling or swiping speeds it up, reverses its direction, and then eases back to its idle pace.',
      'Hover a card to enlarge it while the others dim and lose their color. Add images in the property panel, repeat a small set to fill the ring, or use placeholder tiles while setting up the layout.'
    ],
    features: [
      'Editable title, typography, color, and logo slot',
      'Card size, corner radius, ring dimensions, and tilt controls',
      'Idle speed, scroll boost, maximum speed, and hover controls',
      'Responsive card and title scaling with an adjustable mobile breakpoint'
    ],
    coverImage: '/assets/shop/orbita-images.png',
    coverAlt: 'Villa image cards arranged in a tilted ring on black',
    framerUrl: 'https://orbita-images.framer.website/',
    previewUrl: 'https://orbita-images.framer.website/',
    checkoutUrl: 'https://janemuso.lemonsqueezy.com/checkout/buy/73dfe204-2270-4edf-8b0c-184470ac716d',
    price: '$12'
  },
  {
    slug: 'solvo-loader', name: 'Solvo Loader', category: 'component',
    summary: 'A full-screen preloader with a burst of portraits, title reveal, counter, and page wipe.',
    description: [
      'Solvo appears as soon as it mounts. Up to eight portrait images burst outward from the center at staggered angles while your title reveals character by character. A counter rises in the bottom-right corner before the loader wipes away to reveal the page.',
      'Use your own title or uploaded logo, adjust the pace and delay, and trigger your hero animation with onLoadStart and onLoadComplete. Built for editorial sites, portfolios, real estate, hospitality, and launches with strong photography.'
    ],
    features: [
      'Up to eight individually rotated images with staggered entry and exit',
      'Randomized character reveal or an uploaded SVG or image logo',
      'Sixteen CSS blend modes for the title or logo',
      'Independent counter typography and full background and text color control',
      'Speed multiplier, start delay, onLoadStart and onLoadComplete handlers'
    ],
    coverImage: '/assets/shop/solvo-loader.png',
    coverAlt: 'Stack of villa interior images in front of ONANNI lettering on black',
    framerUrl: 'https://solvo-loader.framer.website/',
    previewUrl: 'https://solvo-loader.framer.website/',
    checkoutUrl: 'https://janemuso.lemonsqueezy.com/checkout/buy/e27aec07-9522-4c8f-b9c1-b4b792a9bcc5',
    price: '$12'
  }
];

export const productPath = (product: Product) => `/shop/${product.slug}/`;
