import type { Faq } from './faqs';

export const siteUrl = 'https://musodesigns.pages.dev';
export const contentUpdated = '2026-11-18';
export const personId = `${siteUrl}/#jane-muso`;
export const organizationId = `${siteUrl}/#organization`;

export const personSchema = {
  '@type': 'Person', '@id': personId, name: 'Jane Muso', jobTitle: 'Founder & Designer',
  image: `${siteUrl}/assets/jennie-portrait-preview.jpg`,
  url: siteUrl,
  sameAs: [
    'https://x.com/TracyCss',
    'https://github.com/muchirijane',
    'https://www.linkedin.com/in/jane-muthoni-muchiri/'
  ]
};

export const organizationSchema = {
  '@type': 'Organization', '@id': organizationId, name: 'Muso.designs', url: siteUrl,
  logo: `${siteUrl}/assets/jennie-favicon.png`,
  founder: { '@id': personId }
};

export const faqSchema = (questions: Faq[]) => ({
  '@type': 'FAQPage',
  mainEntity: questions.map(({ question, answer }) => ({
    '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
});

export const graph = (...items: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org', '@graph': items
});
