// Product content is intentionally separate from presentation. A future Sanity
// query can supply these fields without changing the catalog or detail routes.
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
    coverImage: '/assets/shop/villa-editorial.webp',
    coverAlt: 'Warm modern villa beside a reflecting pool',
    framerUrl: 'https://www.framer.com/marketplace/templates/onanni-villa/',
    previewUrl: 'https://onanni-properties.framer.website/',
    checkoutUrl: 'https://janemuso.lemonsqueezy.com/checkout/buy/57cc3f1e-c9ea-461c-b27d-51bbc366d69e',
    price: '$129',
    visual: 'onanni'
  },
  {
    slug: 'macula-reveal', name: 'Macula Reveal', category: 'component',
    summary: 'A cursor-following reveal that brings hidden imagery into view.',
    description: [
      'Macula Reveal is a Framer component built around a cursor-following smudge reveal. It lets visitors uncover imagery as they move across the page.',
      'Open the live preview to see the motion in context before purchasing the component.'
    ],
    features: ['Framer component', 'Live interaction preview'],
    coverImage: '/assets/shop/macula-editorial.webp',
    coverAlt: 'Editorial portrait used in the visual reveal composition',
    framerUrl: 'https://www.framer.com/marketplace/components/macula-reveal/',
    previewUrl: 'https://macula-reveal.framer.website/',
    checkoutUrl: 'https://janemuso.lemonsqueezy.com/checkout/buy/c8e97775-c59a-4c6f-913f-3d38bed3fb85',
    price: '$12',
    visual: 'macula'
  }
];

export const productPath = (product: Product) => `/shop/${product.slug}/`;
