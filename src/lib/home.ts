import { createClient } from '@sanity/client';
import type { Faq } from '../data/faqs';

const projectId = import.meta.env.SANITY_PROJECT_ID || 'lpyuxxi7';
const dataset = import.meta.env.SANITY_DATASET || 'production';

export type HomeService = { title: string; image: string; paragraphs: string[]; audience: string };
export type HomePage = {
  seoDescription: string;
  heroMeta: string[];
  featuredProjectSlugs: string[];
  galleryThesis: string;
  workflowTools: string;
  servicesHeading: string;
  servicesIntro: string;
  services: HomeService[];
  aboutPortrait: string;
  aboutPortraitAlt: string;
  aboutName: string;
  aboutRole: string;
  aboutStatement: string;
  aboutLinkUrl: string;
  aboutLinkLabel: string;
  insightsHeading: string;
  insightsIntro: string;
  featuredArticleSlugs: string[];
  shopHeading: string;
  shopIntro: string;
  faqHeading: string;
  faqIntro: string;
  faqs: Faq[];
  contactKicker: string;
  contactHeading: string;
  contactLinkLabel: string;
};

type SanityImage = { alt?: string; asset?: { url?: string } };
type SanityHomePage = Omit<HomePage, 'services' | 'aboutPortrait' | 'aboutPortraitAlt' | 'featuredProjectSlugs' | 'featuredArticleSlugs'> & {
  services?: (Omit<HomeService, 'image'> & { image?: SanityImage })[];
  aboutPortrait?: SanityImage;
  featuredProjects?: { slug: string }[];
  featuredArticles?: { slug: string }[];
};

let homePagePromise: Promise<HomePage> | undefined;

export function getHomePage(): Promise<HomePage> {
  return homePagePromise ??= loadHomePage();
}

async function loadHomePage(): Promise<HomePage> {
  const client = createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: false });
  const document = await client.fetch<SanityHomePage | null>(
    `*[_id == "home-page"][0] {
      seoDescription, heroMeta, galleryThesis, workflowTools,
      "featuredProjects": featuredProjects[]->{"slug": slug.current},
      servicesHeading, servicesIntro, services[]{title, paragraphs, audience, image{asset->{url}}},
      aboutPortrait{alt, asset->{url}}, aboutName, aboutRole, aboutStatement, aboutLinkUrl, aboutLinkLabel,
      insightsHeading, insightsIntro, "featuredArticles": featuredArticles[]->{"slug": slug.current},
      shopHeading, shopIntro, faqHeading, faqIntro, faqs[]{question, answer},
      contactKicker, contactHeading, contactLinkLabel
    }`
  );
  if (!document) throw new Error('Published Home page content is missing from Sanity.');

  return {
    ...document,
    featuredProjectSlugs: (document.featuredProjects || []).filter(Boolean).map((project) => project.slug),
    featuredArticleSlugs: (document.featuredArticles || []).filter(Boolean).map((article) => article.slug),
    services: (document.services || []).map((service) => ({ ...service, image: service.image?.asset?.url || '', paragraphs: service.paragraphs || [] })),
    aboutPortrait: document.aboutPortrait?.asset?.url || '',
    aboutPortraitAlt: document.aboutPortrait?.alt || '',
    faqs: document.faqs || []
  };
}
