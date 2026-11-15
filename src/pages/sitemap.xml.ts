import type { APIRoute } from 'astro';
import { articles } from '../data/articles';
import { products } from '../data/products';
import { projects } from '../data/projects';
import { contentUpdated, siteUrl } from '../data/seo';

const paths = [
  { path: '/', lastmod: contentUpdated },
  { path: '/contact/', lastmod: contentUpdated },
  { path: '/work/' },
  ...projects.map(({ slug }) => ({ path: `/work/${slug}/` })),
  { path: '/blog/' },
  ...articles.map(({ slug }) => ({ path: `/blog/${slug}/` })),
  { path: '/shop/' },
  ...products.map(({ slug }) => ({ path: `/shop/${slug}/` }))
];

export const GET: APIRoute = () => {
  const urls = paths.map(({ path, lastmod }) =>
    `  <url><loc>${new URL(path, siteUrl).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
  ).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
