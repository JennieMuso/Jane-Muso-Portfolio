import { createReadStream } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createClient } from '@sanity/client';
import { servicePackages, serviceAddOns } from '../src/data/servicePackages.ts';
import { contactFaqs } from '../src/data/faqs.ts';
import { serviceProcessSteps } from '../src/data/serviceProcess.ts';

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_ORGANIZATION_TOKEN;
if (!token) throw new Error('A Sanity write token is required.');
const client = createClient({ projectId: process.env.SANITY_PROJECT_ID || 'lpyuxxi7', dataset: process.env.SANITY_DATASET || 'production', apiVersion: '2025-02-19', token, useCdn: false });
const keyed = (items, prefix) => items.map((item, index) => ({ _key: `${prefix}-${index}`, _type: 'object', ...item }));

async function uploadImage(path, alt) {
  const localPath = resolve('public', path.replace(/^\//, ''));
  const asset = await client.assets.upload('image', createReadStream(localPath), { filename: basename(localPath) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt };
}

async function buildProcessSteps() {
  const steps = [];
  for (const [index, item] of serviceProcessSteps.entries()) {
    const { image, imageAlt, ...copy } = item;
    steps.push({ _type: 'object', _key: `process-${index + 1}`, ...copy, image: await uploadImage(image, imageAlt) });
  }
  return steps;
}

if (!(await client.getDocument('services-page'))) {
  const packages = [];
  for (const item of servicePackages) {
    const { image, imageAlt, number, ...editable } = item;
    packages.push({ _type: 'object', _key: `package-${item.id}`, ...editable, image: await uploadImage(image, imageAlt) });
  }
  await client.create({
    _id: 'services-page', _type: 'servicePage',
    seoDescription: 'Explore Muso Launch, Signature, and Experience: website design packages with clear scope, timelines, and starting prices from Jane Muso.',
    heroTitle: 'Launch & Grow',
    heroIntro: 'Beautifully considered websites, built to make businesses more credible, easier to discover, and simpler to contact. Every project begins with a goal, not just a page count.',
    packages,
    processTitle: 'CLEAR FROM\nFIRST CALL\nTO LAUNCH',
    processParagraphs: [
      'Every package follows a transparent journey: discovery, strategy, design, development, testing, and launch. You work directly with Jane, with scheduled feedback checkpoints, an agreed scope, handover assets, and a defined bug-fix window.',
      'You provide brand assets, approved copy and media, legal or privacy text, third-party credentials, and one decision-maker to consolidate feedback. Delayed content or approvals may change the schedule.'
    ],
    processSteps: await buildProcessSteps(),
    addOnsIntro: 'Need another page, a deeper CMS, or support after launch? We can shape the right extras around the work.',
    addOns: keyed(serviceAddOns, 'addon'),
    careOptions: keyed([
      { name: 'Essential Care', price: 'From AED 500 / month', priceUsd: 'From USD 150 / month', description: 'Light monitoring and up to one hour of website updates each month.' },
      { name: 'Growth Care', price: 'From AED 1,200 / month', priceUsd: 'From USD 350 / month', description: 'Up to three hours of updates, an analytics review, and priority support each month.' }
    ], 'care'),
    terms: 'Prices are starting guides, not fixed quotations. AED and USD figures are separate rounded guides, not live currency conversions. Final scope, currency, applicable taxes, and any third-party costs are confirmed in your proposal. A suggested payment schedule is 50% at booking, 30% after design approval, and 20% before launch. Business outcomes are goals, not guaranteed results.',
    scopeExclusions: 'Brand identity, logo design, full copywriting and translation, photo or video production, paid advertising, ongoing SEO, domain and hosting charges, platform subscriptions, ecommerce, online ordering, custom reservation engines, additional languages, extensive integrations, and ongoing content publishing are quoted separately unless included in your proposal. A CMS for Muso Launch is also an optional add-on.',
    faqHeading: 'GOOD QUESTIONS', faqIntro: 'A few details before we begin.',
    faqs: keyed([
      { question: 'Can I choose a package and still tailor it?', answer: 'Yes. The packages are starting points. We will agree the scope, platform, timeline, and any add-ons in your proposal.' },
      { question: 'Are the prices fixed?', answer: 'No. The displayed prices are starting guides. Your final proposal reflects the scope, currency, taxes, and any third-party costs.' },
      { question: 'Can you support my site after launch?', answer: 'Yes. Essential Care and Growth Care offer ongoing updates and support, or we can discuss a different arrangement for your needs.' }
    ], 'faq')
  });
  console.log('Created Services page in Sanity');
}

const services = await client.getDocument('services-page');
if (services?.heroTitle === 'LAUNCH & GROW') {
  await client.patch('services-page').set({ heroTitle: 'Launch & Grow' }).commit();
}
if (services) {
  if (!Array.isArray(services.processSteps) || services.processSteps.length === 0) {
    await client.patch('services-page').set({ processSteps: await buildProcessSteps() }).commit();
    console.log('Added process stages and images to Services page');
  }
  const addOnUsd = new Map(serviceAddOns.map((item) => [item.name, item.priceUsd]));
  const careUsd = new Map([['Essential Care', 'From USD 150 / month'], ['Growth Care', 'From USD 350 / month']]);
  const addOns = (services.addOns || []).map((item) => item.priceUsd ? item : { ...item, priceUsd: addOnUsd.get(item.name) || 'Quoted after discovery' });
  const careOptions = (services.careOptions || []).map((item) => item.priceUsd ? item : { ...item, priceUsd: careUsd.get(item.name) || 'Quoted after discovery' });
  if (JSON.stringify(addOns) !== JSON.stringify(services.addOns) || JSON.stringify(careOptions) !== JSON.stringify(services.careOptions)) {
    await client.patch('services-page').set({ addOns, careOptions }).commit();
    console.log('Added USD guides to Services add-ons and care options');
  }
}

if (!(await client.getDocument('contact-page'))) {
  await client.create({ _id: 'contact-page', _type: 'contactPage', faqHeading: 'BEFORE YOU ASK', faqIntro: 'A few things worth knowing before we begin.', faqs: keyed(contactFaqs, 'faq') });
  console.log('Created Contact FAQs in Sanity');
}

const home = await client.getDocument('home-page');
if (home) {
  const changes = {};
  for (const field of ['seoDescription', 'aboutName']) {
    if (typeof home[field] === 'string' && home[field].includes('Jennie Muso')) changes[field] = home[field].replaceAll('Jennie Muso', 'Jane Muso');
  }
  if (Array.isArray(home.heroMeta)) {
    const corrected = home.heroMeta.map((value) => typeof value === 'string' ? value.replaceAll('Jennie Muso', 'Jane Muso') : value);
    if (JSON.stringify(corrected) !== JSON.stringify(home.heroMeta)) changes.heroMeta = corrected;
  }
  if (home.aboutPortrait?.alt?.includes('Jennie Muso')) changes['aboutPortrait.alt'] = home.aboutPortrait.alt.replaceAll('Jennie Muso', 'Jane Muso');
  if (Object.keys(changes).length) { await client.patch('home-page').set(changes).commit(); console.log('Updated name in Home page content'); }
}

const work = await client.getDocument('work-page');
if (typeof work?.seoDescription === 'string' && work.seoDescription.includes('Jennie Muso')) {
  await client.patch('work-page').set({ seoDescription: 'Explore website design case studies by Jane Muso for Veyra Cargo, Bayline Legal, JIN Restaurant, and Nacre Dental.' }).commit();
  console.log('Updated Work page search description');
}
