import { createClient } from '@sanity/client';
import type { Product } from '../data/products';

const projectId = import.meta.env.SANITY_PROJECT_ID || 'lpyuxxi7';
const dataset = import.meta.env.SANITY_DATASET || 'production';

type SanityProduct = Omit<Product, 'price' | 'coverImage' | 'previewImage'> & {
  price: number;
  coverImage?: { alt?: string; asset?: { url?: string } };
  previewImage?: { asset?: { url?: string } };
};

let productsPromise: Promise<Product[]> | undefined;

export function getProducts(): Promise<Product[]> {
  return productsPromise ??= loadProducts();
}

async function loadProducts(): Promise<Product[]> {
  const client = createClient({ projectId, dataset, apiVersion: '2025-02-19', useCdn: false });
  const documents = await client.fetch<SanityProduct[]>(
    `*[_type == "product" && defined(slug.current) && defined(coverImage.asset) && defined(previewUrl) && defined(checkoutUrl)] | order(sortOrder asc, name asc) {
      "slug": slug.current, name, category, price, summary, description, features,
      previewMode, previewUrl, checkoutUrl, framerUrl,
      coverImage { alt, asset->{url} }, previewImage { asset->{url} }
    }`
  );

  return documents.map((document) => ({
    ...document,
    price: `$${document.price}`,
    coverImage: document.coverImage?.asset?.url,
    coverAlt: document.coverImage?.alt || '',
    previewImage: document.previewImage?.asset?.url,
    description: document.description || [],
    features: document.features || []
  }));
}
