import { createClient } from '@sanity/client';
import { contactFaqs, type Faq } from '../data/faqs';

const client = createClient({ projectId: import.meta.env.SANITY_PROJECT_ID || 'lpyuxxi7', dataset: import.meta.env.SANITY_DATASET || 'production', apiVersion: '2025-02-19', useCdn: false });
export type ContactPage = { faqHeading: string; faqIntro: string; faqs: Faq[] };
let promise: Promise<ContactPage> | undefined;
export function getContactPage(): Promise<ContactPage> {
  return promise ??= client.fetch<ContactPage | null>(`*[_id == "contact-page"][0]{faqHeading, faqIntro, faqs[]{question, answer}}`)
    .then((document) => document || { faqHeading: 'BEFORE YOU ASK', faqIntro: 'A few things worth knowing before we begin.', faqs: contactFaqs });
}
