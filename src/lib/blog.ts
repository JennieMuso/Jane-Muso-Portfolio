import { createClient } from '@sanity/client';
import { articles as localArticles, type Article } from '../data/articles';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

type SanityArticle = Omit<Article, 'hero' | 'inlineImage'> & {
  heroImage?: { alt?: string; asset?: { url?: string } };
  bodyImage?: { alt?: string; asset?: { url?: string } };
};

let articlesPromise: Promise<Article[]> | undefined;

export function getArticles(): Promise<Article[]> {
  return articlesPromise ??= loadArticles();
}

async function loadArticles(): Promise<Article[]> {
  // The local articles keep the site buildable until a Sanity project is connected.
  if (!projectId) return localArticles;

  const client = createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: false });
  const documents = await client.fetch<SanityArticle[]>(
    `*[_type == "article" && defined(slug.current) && defined(heroImage.asset)] | order(sortOrder asc, publishedAt desc) {
      "slug": slug.current, title, topic, excerpt, readTime,
      inlineCaption,
      sections[] { "id": id.current, heading, paragraphs },
      references[] { label, url },
      heroImage { alt, asset->{url} }, bodyImage { alt, asset->{url} }
    }`
  );

  return documents.map((document) => ({
    ...document,
    hero: document.heroImage?.asset?.url || '',
    heroAlt: document.heroImage?.alt || document.heroAlt || '',
    inlineImage: document.bodyImage?.asset?.url || '',
    inlineAlt: document.bodyImage?.alt || document.inlineAlt || '',
    inlineCaption: document.inlineCaption || '',
    sections: document.sections || [],
    references: document.references || []
  }));
}
