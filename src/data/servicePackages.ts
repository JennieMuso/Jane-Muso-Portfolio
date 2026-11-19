export type ServicePackage = {
  id: string;
  name: string;
  number: string;
  tagline: string;
  priceAed: string;
  priceUsd: string;
  duration: string;
  pages: string;
  audience: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  benefit: string;
};

export const servicePackages: ServicePackage[] = [
  {
    id: 'launch',
    name: 'Muso Launch',
    number: '01',
    tagline: 'A confident place to begin.',
    priceAed: '8,500',
    priceUsd: '2,500',
    duration: '2–3 weeks',
    pages: 'Up to 4',
    audience: 'For independent professionals, small service businesses, boutique cafés, and new brands ready for a professional digital starting point.',
    image: '/assets/service-web.jpg',
    imageAlt: 'A thoughtfully designed website displayed on a laptop',
    deliverables: [
      'Discovery call of up to 60 minutes and a goals questionnaire.',
      'Review of up to two competitors, plus a sitemap and page content plan.',
      'Bespoke visual design using your existing brand, responsive across desktop, tablet, and mobile.',
      'Up to four unique pages with clear navigation, calls to action, and purposeful lightweight interactions.',
      'Development on an agreed platform, contact form, social links, and optional booking or WhatsApp links.',
      'SEO foundations: semantic structure, page titles, descriptions, image text, sitemap, and Search Console connection.',
      'Basic performance and device testing, domain connection, guided launch, and handover guidance.',
      'Two consolidated design revision rounds and 14 days of bug-fix support.'
    ],
    benefit: 'Builds credibility, explains your services clearly, and gives customers a simpler way to enquire or book. It creates an organised foundation for search visibility.'
  },
  {
    id: 'signature',
    name: 'Muso Signature',
    number: '02',
    tagline: 'More clarity. More character. Better journeys.',
    priceAed: '15,000',
    priceUsd: '4,500',
    duration: '4–6 weeks',
    pages: 'Up to 8',
    audience: 'For established restaurants, clinics, law firms, logistics companies, and service businesses ready to sharpen their positioning and attract qualified enquiries.',
    image: '/assets/service-nocode.jpg',
    imageAlt: 'A designer shaping the layout and visual direction of a website',
    deliverables: [
      'A strategy workshop of up to 90 minutes, research on up to four competitors, and audience journey analysis.',
      'Conversion goals, sitemap, content strategy, and wireframes for key pages.',
      'Custom art direction, editorial typography, considered storytelling, and fully responsive design.',
      'Up to eight unique pages with meaningful interactions and considered scroll animation.',
      'Custom Astro, Framer, or other agreed platform development, with a CMS for up to two content types where needed.',
      'Enquiry forms, booking or CRM links, analytics, and key conversion events.',
      'SEO and answer-engine foundations: search intent, internal links, structured headings, relevant schema, and indexability checks.',
      'Performance, accessibility, and device testing; launch; one CMS training session of up to 60 minutes.',
      'Three consolidated design revision rounds and 30 days of bug-fix support.'
    ],
    benefit: 'Helps people understand what sets your business apart and move through the site with less confusion. Stronger content structure supports discovery, while analytics shows which pages and actions perform.'
  },
  {
    id: 'experience',
    name: 'Muso Experience',
    number: '03',
    tagline: 'A distinctive world your visitors can feel.',
    priceAed: '25,000',
    priceUsd: '7,500',
    duration: '6–10 weeks',
    pages: 'Up to 12',
    audience: 'For luxury hospitality, fine dining, premium property, and established brands looking for immersive storytelling and more complex interaction.',
    image: '/assets/service-code.jpg',
    imageAlt: 'A custom website being developed on a laptop in a warm studio',
    deliverables: [
      'Extended discovery and strategy workshops, expanded competitor and audience research, and detailed journey mapping.',
      'Comprehensive information architecture, page-level content plans, and creative concept exploration.',
      'Bespoke art direction, rich editorial layouts, detailed responsive treatments, and up to twelve unique pages.',
      'Advanced motion where useful, including choreographed transitions, video integration, and custom interactive components.',
      'Bespoke Astro, React, or other agreed development, reusable components, and a CMS for up to three content types.',
      'One supported third-party API integration, subject to technical discovery and a clearly defined scope.',
      'Expanded search-intent and technical SEO foundations, structured data, analytics events, and launch testing.',
      'Up to two handover or training sessions, three consolidated design revision rounds, and 60 days of bug-fix support.',
      'One post-launch performance review.'
    ],
    benefit: 'Expresses a premium brand through an experience people remember. Rich storytelling can support high-value enquiries, while reusable components and CMS structures make the site easier to maintain.'
  }
];

export const serviceAddOns = [
  { name: 'Additional standard page', price: 'AED 750–1,500', priceUsd: 'USD 200–400' },
  { name: 'Advanced page', price: 'AED 1,500–3,000+', priceUsd: 'USD 400–800+' },
  { name: 'Further CMS scope', price: 'From AED 1,500', priceUsd: 'From USD 400' },
  { name: 'Additional language implementation', price: 'From AED 2,500', priceUsd: 'From USD 700', note: 'Translation is priced separately.' },
  { name: 'Custom animation', price: 'AED 750–2,500+', priceUsd: 'USD 200–700+' },
  { name: 'Extra revision round', price: 'From AED 750', priceUsd: 'From USD 200' },
  { name: 'Complex integration', price: 'Quoted after discovery', priceUsd: 'Quoted after discovery' }
];
