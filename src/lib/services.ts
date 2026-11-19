import { createClient } from '@sanity/client';
import { servicePackages, serviceAddOns, type ServicePackage } from '../data/servicePackages';
import type { Faq } from '../data/faqs';
import { serviceProcessSteps, type ServiceProcessStep } from '../data/serviceProcess';

const client = createClient({ projectId: import.meta.env.SANITY_PROJECT_ID || 'lpyuxxi7', dataset: import.meta.env.SANITY_DATASET || 'production', apiVersion: '2025-02-19', useCdn: false });

type CareOption = { name: string; price: string; priceUsd: string; description: string };
export type ServicePage = {
  seoDescription: string; heroTitle: string; heroIntro: string; packages: ServicePackage[];
  processTitle: string; processParagraphs: string[]; processSteps: ServiceProcessStep[]; addOnsIntro: string;
  addOns: typeof serviceAddOns; careOptions: CareOption[]; terms: string; scopeExclusions: string;
  faqHeading: string; faqIntro: string; faqs: Faq[];
};

const fallback: ServicePage = {
  seoDescription: 'Explore Muso Launch, Signature, and Experience: website packages with clear scope, timelines, and starting prices. Add-ons and ongoing care are available.',
  heroTitle: 'Launch & Grow',
  heroIntro: 'Beautifully considered websites, built to make businesses more credible, easier to discover, and simpler to contact. Every project begins with a goal, not just a page count.',
  packages: servicePackages,
  processTitle: 'CLEAR FROM\nFIRST CALL\nTO LAUNCH',
  processParagraphs: [
    'Every package follows a transparent journey: discovery, strategy, design, development, testing, and launch. You work directly with Jane, with scheduled feedback checkpoints, an agreed scope, handover assets, and a defined bug-fix window.',
    'You provide brand assets, approved copy and media, legal or privacy text, third-party credentials, and one decision-maker to consolidate feedback. Delayed content or approvals may change the schedule.'
  ],
  processSteps: serviceProcessSteps,
  addOnsIntro: 'Need another page, a deeper CMS, or support after launch? We can shape the right extras around the work.',
  addOns: serviceAddOns,
  careOptions: [
    { name: 'Essential Care', price: 'From AED 500 / month', priceUsd: 'From USD 150 / month', description: 'Light monitoring and up to one hour of website updates each month.' },
    { name: 'Growth Care', price: 'From AED 1,200 / month', priceUsd: 'From USD 350 / month', description: 'Up to three hours of updates, an analytics review, and priority support each month.' }
  ],
  terms: 'Prices are starting guides, not fixed quotations. AED and USD figures are separate rounded guides, not live currency conversions. Final scope, currency, applicable taxes, and any third-party costs are confirmed in your proposal. A suggested payment schedule is 50% at booking, 30% after design approval, and 20% before launch. Business outcomes are goals, not guaranteed results.',
  scopeExclusions: 'Brand identity, logo design, full copywriting and translation, photo or video production, paid advertising, ongoing SEO, domain and hosting charges, platform subscriptions, ecommerce, online ordering, custom reservation engines, additional languages, extensive integrations, and ongoing content publishing are quoted separately unless included in your proposal. A CMS for Muso Launch is also an optional add-on.',
  faqHeading: 'GOOD QUESTIONS', faqIntro: 'A few details before we begin.',
  faqs: [
    { question: 'Can I choose a package and still tailor it?', answer: 'Yes. The packages are starting points. We will agree the scope, platform, timeline, and any add-ons in your proposal.' },
    { question: 'Are the prices fixed?', answer: 'No. The displayed prices are starting guides. Your final proposal reflects the scope, currency, taxes, and any third-party costs.' },
    { question: 'Can you support my site after launch?', answer: 'Yes. Essential Care and Growth Care offer ongoing updates and support, or we can discuss a different arrangement for your needs.' }
  ]
};

type SanityServicePage = Omit<ServicePage, 'packages' | 'processSteps'> & {
  packages?: (Omit<ServicePackage, 'image' | 'imageAlt'> & { image?: { alt?: string; asset?: { url?: string } } })[];
  processSteps?: (Omit<ServiceProcessStep, 'image' | 'imageAlt'> & { image?: { alt?: string; asset?: { url?: string } } })[];
};
let promise: Promise<ServicePage> | undefined;

export function getServicePage(): Promise<ServicePage> {
  return promise ??= client.fetch<SanityServicePage | null>(`*[_id == "services-page"][0]{
    seoDescription, heroTitle, heroIntro,
    packages[]{id, name, tagline, priceAed, priceUsd, duration, pages, audience, deliverables, benefit, image{alt, asset->{url}}},
    processTitle, processParagraphs, processSteps[]{title, description, clientRole, outcome, image{alt, asset->{url}}},
    addOnsIntro, addOns[]{name, price, priceUsd, note}, careOptions[]{name, price, priceUsd, description},
    terms, scopeExclusions, faqHeading, faqIntro, faqs[]{question, answer}
  }`).then((document) => document ? {
    ...fallback, ...document,
    packages: (document.packages || []).map((item, index) => ({
      ...item, number: String(index + 1).padStart(2, '0'), image: item.image?.asset?.url || servicePackages[index]?.image || '',
      imageAlt: item.image?.alt || servicePackages[index]?.imageAlt || item.name,
      deliverables: item.deliverables || []
    })),
    processSteps: document.processSteps?.length ? document.processSteps.map((item, index) => ({
      ...item,
      image: item.image?.asset?.url || serviceProcessSteps[index]?.image || '',
      imageAlt: item.image?.alt || serviceProcessSteps[index]?.imageAlt || item.title
    })) : serviceProcessSteps,
    addOns: document.addOns || [], careOptions: document.careOptions || [], faqs: document.faqs || []
  } : fallback);
}
