import { createReadStream, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createClient } from '@sanity/client';
import { articles } from '../src/data/articles.ts';

if (existsSync('.env')) process.loadEnvFile('.env');

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  throw new Error('Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env before importing.');
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-02-19', useCdn: false });

async function uploadImage(path, alt) {
  const file = resolve('public', path.replace(/^\//, ''));
  if (!existsSync(file)) throw new Error(`Missing image: ${file}`);
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt };
}

for (const [index, article] of articles.entries()) {
  const id = `article-${article.slug}`;
  if (await client.getDocument(id)) {
    console.log(`Skipped existing article: ${article.slug}`);
    continue;
  }

  const document = {
    _id: id,
    _type: 'article',
    title: article.title,
    slug: { _type: 'slug', current: article.slug },
    topic: article.topic,
    excerpt: article.excerpt,
    readTime: article.readTime,
    sortOrder: index + 1,
    publishedAt: new Date().toISOString(),
    heroImage: await uploadImage(article.hero, article.heroAlt),
    bodyImage: await uploadImage(article.inlineImage, article.inlineAlt),
    sections: article.sections.map((section, sectionIndex) => ({
      _type: 'section',
      _key: `section-${sectionIndex}`,
      id: { _type: 'slug', current: section.id },
      heading: section.heading,
      paragraphs: section.paragraphs
    })),
    references: article.references?.map((reference, referenceIndex) => ({
      _type: 'object',
      _key: `reference-${referenceIndex}`,
      ...reference
    })) || []
  };

  await client.create(document);
  console.log(`Imported: ${article.title}`);
}
