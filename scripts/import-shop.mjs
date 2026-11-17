import { createReadStream, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createClient } from '@sanity/client';
import { products } from '../src/data/products.ts';

if (existsSync('.env')) process.loadEnvFile('.env');

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  throw new Error('Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN before importing.');
}

const client = createClient({ projectId, dataset, token, apiVersion: '2025-02-19', useCdn: false });

async function uploadImage(path, alt) {
  if (!path) return undefined;
  const file = resolve('public', path.replace(/^\//, ''));
  if (!existsSync(file)) throw new Error('Missing image: ' + file);
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, ...(alt ? { alt } : {}) };
}

for (const [index, product] of products.entries()) {
  const id = 'product-' + product.slug;
  if (await client.getDocument(id)) {
    console.log('Skipped existing product: ' + product.slug);
    continue;
  }

  const document = {
    _id: id,
    _type: 'product',
    name: product.name,
    slug: { _type: 'slug', current: product.slug },
    category: product.category,
    price: Number(product.price.replace(/[^0-9.]/g, '')),
    summary: product.summary,
    description: product.description,
    features: product.features,
    coverImage: await uploadImage(product.coverImage, product.coverAlt),
    previewImage: await uploadImage(product.previewImage),
    previewMode: product.previewMode || 'embed',
    previewUrl: product.previewUrl,
    checkoutUrl: product.checkoutUrl,
    framerUrl: product.framerUrl,
    sortOrder: index + 1
  };

  await client.create(document);
  console.log('Imported: ' + product.name);
}
