import type { APIRoute } from 'astro';
import { getArticles } from '../lib/blog';
import { products } from '../data/products';
import { projects } from '../data/projects';
import { contentUpdated, siteUrl } from '../data/seo';

const staticPaths = [
  { path: '/', lastmod: contentUpdated },
  { path: '/contact/', lastmod: contentUpdated },
  { path: '/work/' },
  ...projects.map(({ slug }) => ({ path: `/work/${slug}/` })),
  { path: '/blog/' },
  { path: '/shop/' },
  ...products.map(({ slug }) => ({ path: `/shop/${slug}/` }))
];

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  const paths = [...staticPaths, ...articles.map(({ slug }) => ({ path: `/blog/${slug}/` }))];
  const urls = paths.map(({ path, lastmod }) =>
    `  <url><loc>${new URL(path, siteUrl).href}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`
  ).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
