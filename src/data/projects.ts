// Original case studies are retained for the one-time Sanity import.
export type ProjectImageKind = 'hero' | 'desktop' | 'mobile' | 'detail' | 'interior' | 'secondary';
export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  liveUrl: string;
  heroAlt: string;
  intro: string;
  story: string[];
  designNote: string;
  detailCaption: string;
  secondaryCaption: string;
  accent: string;
  canvas: string;
  disciplines: string[];
  stack: string[];
  images?: Partial<Record<ProjectImageKind, string>>;
  imageAlts?: Partial<Record<ProjectImageKind, string>>;
};

export const projects: Project[] = [
  {
    slug: 'veyra-cargo', name: 'Veyra Cargo', eyebrow: 'Cargo / Dubai',
    liveUrl: 'https://cargo-shipping-dubai.pages.dev/',
    heroAlt: 'Container ship alongside the port in Dubai',
    intro: 'A clearer route from China to the UAE.',
    story: [
      'Veyra speaks to retailers and interiors businesses bringing stock in from China. A shipment can involve several suppliers, different timelines and a stack of paperwork; the site needed to make that complexity feel manageable from the first screen.',
      'A direct headline, visual route through the services and a focused enquiry path help visitors understand what information to gather and what happens next. Cargo photography gives the experience its scale while practical copy keeps it grounded.'
    ],
    designNote: 'A confident opening, followed by the practical detail a business needs before it can enquire.',
    detailCaption: 'The service story / real cargo, real moving parts',
    secondaryCaption: 'From first question to a prepared enquiry',
    accent: '#d6e869', canvas: '#dfe9e7',
    disciplines: ['Web design', 'Website development'],
    stack: ['GSAP', 'Cloudflare', 'Git', 'GitHub']
  },
  {
    slug: 'bayline-legal', name: 'Bayline Legal', eyebrow: 'Legal / Dubai',
    liveUrl: 'https://dubai-legal-firm.pages.dev/',
    heroAlt: 'Legal professionals in conversation with the Dubai skyline behind them',
    intro: 'Business law, with a clear next step.',
    story: [
      'Legal decisions carry weight. Bayline’s website is designed for founders, companies and investors who need to find the right area of expertise and understand how to begin a conversation.',
      'The experience pairs a restrained visual system with plain language. Practice areas, lawyer profiles and the consultation journey are organised around the questions a potential client is likely to ask, so the path to useful counsel stays visible.'
    ],
    designNote: 'Authority comes through in the pacing: considered imagery, precise type and a direct route to counsel.',
    detailCaption: 'Practice areas / information with room to breathe',
    secondaryCaption: 'A visual language built on trust and clarity',
    accent: '#c8d7ce', canvas: '#e3eae5',
    disciplines: ['Web design', 'Website development'],
    stack: ['Astro', 'Cloudflare', 'Git', 'GitHub']
  },
  {
    slug: 'jin-restaurant', name: 'JIN Restaurant', eyebrow: 'Dining / Dubai',
    liveUrl: 'https://jin-sushi-restaurant.pages.dev/',
    heroAlt: 'Intimate Japanese dining counter in warm red light',
    intro: 'The art of dining, up close.',
    story: [
      'JIN’s digital experience sets the mood before a guest reaches the table. Rich reds, quiet typography and close-up food imagery introduce an intimate omakase concept shaped around precision, curiosity and the pleasure of a place at the counter.',
      'The site moves between atmosphere and useful detail: experience, menu, chef and private dining each have their own space. The visual rhythm lets the food lead while the navigation keeps the next step easy to find.'
    ],
    designNote: 'A dining experience told in close detail, from the glow of the room to the finish of a single piece of nigiri.',
    detailCaption: 'Omakase / a menu in motion',
    secondaryCaption: 'Ingredients and craft lead the visual story',
    accent: '#d5a983', canvas: '#3c1717',
    disciplines: ['Web design', 'Website development'],
    stack: ['Cloudflare', 'Git', 'GitHub']
  },
  {
    slug: 'nacre-dental', name: 'Nacre Dental', eyebrow: 'Healthcare / Dubai',
    liveUrl: 'https://dubai-dental-website.pages.dev/',
    heroAlt: 'Close portrait of a woman smiling',
    intro: 'Feel good about smiling.',
    story: [
      'Dental care can feel intimidating before the first appointment. Nacre’s website opens with warmth, then gives people the information they need to feel comfortable choosing a service and making contact.',
      'The site connects treatment pages, clinician profiles and appointment paths through a calm, spacious interface. Clear explanations make room for both practical questions and the personal reasons someone might seek care.'
    ],
    designNote: 'Warm imagery and generous space make clinical information feel approachable.',
    detailCaption: 'Services / care explained in human terms',
    secondaryCaption: 'The clinic / a calm place to begin',
    accent: '#d8b4a4', canvas: '#e8e5df',
    disciplines: ['Web design', 'Website development'],
    stack: ['GSAP', 'Cloudflare', 'Git', 'GitHub']
  }
];

export const projectAsset = (project: Project, kind: ProjectImageKind) => project.images?.[kind] || `/assets/case-studies/${project.slug.split('-')[0]}-${kind}.webp`;
